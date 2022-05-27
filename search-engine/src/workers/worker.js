const config = require('../config/config');
const rabbitmq = require('../rabbitmq/rabbitmq');
const service = require('../services/search.service');
const logger = require('../services/logger.service');

/**
 * @class Worker
 * @author Emanuel Balcazar
 */
class Worker {

    /**
     * Creates an instance of Worker.
     * @param  {string} routingKey
     * @param  {object} searcher
     */
    constructor(routingKey) {
        this.routingKey = routingKey;
        this.channel = null;
        this.requestCount = 0;
    }

    /**
     * Connect with rabbitmq
     * @return {void}
     */
    async connect() {
        let connection = await rabbitmq.getConnection();
        this.channel = await connection.createChannel();
    }

    /**
     * Create channel and consume from queues
     * @return {void}
     */
    async start() {
        await this.connect();

        // assert exchange and queue
        this.channel.assertExchange(config.CONSUMER_EXCHANGE, 'direct', { durable: true });
        let queueInstance = await this.channel.assertQueue('', { exclusive: true });
        await this.channel.bindQueue(queueInstance.queue, config.CONSUMER_EXCHANGE, this.routingKey);

        console.log(`[${this.routingKey}] - worker esperando nuevos mensajes...`);

        // only consume one message at a time
        this.channel.prefetch(1);

        this.channel.consume(queueInstance.queue, async (msg) => {
            let params = JSON.parse(msg.content.toString());
            await logger.info('search engine', `worker ${this.routingKey}`, 'ecuacion entrante', params.equation.id, params.equation.q, params.equation.start);
            await this.search(params);
            this.channel.ack(msg);
        });
    }

    /**
     * Execute a search using http protocol
     * @param  {Object} equation
     * @return {void}
     */
    async search(message) {
        try {
            let params = message;
            let requestLimit = message.requestLimit || 10;
            let hasPages = true;

            while ((this.requestCount < requestLimit) && hasPages) {

                let results = await service.search(params);
                await this.channel.assertExchange(config.PUBLISH_EXCHANGE, 'direct', { durable: true });
                await this.channel.publish(config.PUBLISH_EXCHANGE, this.routingKey, Buffer.from(JSON.stringify(results)));

                // check if has next page
                hasPages = (results.nextPage.startIndex > 0 && results.nextPage.startIndex <= 100) ? true : false;
                this.requestCount++;
                params.equation.start = (results.nextPage) ? results.nextPage.startIndex : params.equation.start;

                // update equation start values
                if (hasPages) {
                    await rabbitmq.sendToQueue(config.SERVER_QUEUE, { type: 'incrementRequestCount', data: '' });
                    await rabbitmq.sendToQueue(config.SERVER_QUEUE, { type: 'updateEquationStart', data: { id: params.equation.id, start: params.equation.start } });
                }

                // sleep so as not to saturate the request to google
                await sleep(config.WORKER_SLEEP_TIME);
            }

            if (!hasPages && this.requestCount <= requestLimit) {
                await rabbitmq.sendToQueue(config.SERVER_QUEUE, { type: 'updateEquationStart', data: { id: params.equation.id, start: 1 } });
                await rabbitmq.sendToQueue(config.SERVER_QUEUE, { type: 'getNextEquationDate', data: { id: params.equation.id } });
            }

            if (this.requestCount >= requestLimit) {
                await logger.success('search engine', `worker ${this.routingKey}`, `termino su cuota diaria con ${this.requestCount} de ${requestLimit} realizados`, params.equation.id, params.equation.q, params.equation.start);
                this.requestCount = 0;
                await rabbitmq.sendToQueue(config.SERVER_QUEUE, { type: 'resetRequestCount', data: '' });
                await rabbitmq.sendToQueue(config.SERVER_QUEUE, { type: 'rescheduleNextDay', data: '' });
            }

            return;
        } catch (error) {
            // Quota exceeded for quota metric 'Queries' and limit 'Queries per day' of service 'customsearch.googleapis.com'
            if (error.code == 429) {
                await rabbitmq.sendToQueue(config.SERVER_QUEUE, { type: 'resetRequestCount', data: '' });
                await rabbitmq.sendToQueue(config.SERVER_QUEUE, { type: 'rescheduleNextDay', data: '' });
            }

            await logger.error('search engine', `worker ${this.routingKey}`, (isJson(error.message) ? JSON.stringify(error.message) : error.message), error.stack);
        }
    }
}

function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

function isJson(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

module.exports = Worker;
