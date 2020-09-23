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

        this.channel.assertExchange(config.CONSUMER_EXCHANGE, 'direct', { durable: true });
        let queueInstance = await this.channel.assertQueue('', { exclusive: true });

        await this.channel.bindQueue(queueInstance.queue, config.CONSUMER_EXCHANGE, this.routingKey);

        console.log(`[${this.routingKey}] - worker esperando nuevos mensajes...`);

        this.channel.consume(queueInstance.queue, async (msg) => {
            let params = JSON.parse(msg.content.toString());
            await logger.info('search engine', `worker ${this.routingKey}`, `ecuacion de ID: ${params.equation.id} q: ${params.equation.q} indice: ${params.equation.start} entrante desde rabbitmq`);
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

            while ((this.requestCount <= requestLimit) && hasPages) {
                let results = await service.search(params);

                this.channel.assertExchange(config.PUBLISH_EXCHANGE, 'direct', { durable: true });
                await this.channel.publish(config.PUBLISH_EXCHANGE, this.routingKey, Buffer.from(JSON.stringify(results)));

                // check if has next page
                hasPages = (results.nextPage.startIndex > 0 && results.nextPage.startIndex <= 100) ? true : false;
                this.requestCount++;
                params.equation.start = (results.nextPage) ? results.nextPage.startIndex : params.equation.start;

                // update equation start values
                if (hasPages) {
                    await rabbitmq.sendToQueue(config.SERVER_QUEUE, { type: 'updateRequestCount', data: this.requestCount });
                    await rabbitmq.sendToQueue(config.SERVER_QUEUE, { type: 'updateEquationStart', data: { id: params.equation.id, start: params.equation.start } });
                } else {
                    await rabbitmq.sendToQueue(config.SERVER_QUEUE, { type: 'updateEquationStart', data: { id: params.equation.id, start: 1 } });
                }
            }

            if (!hasPages && this.requestCount < requestLimit) {
                await rabbitmq.sendToQueue(config.SERVER_QUEUE, { type: 'getNextEquationDate', data: { id: params.equation.id } });
            }

            if (this.requestCount == requestLimit) {
                this.requestCount == 0;
                await rabbitmq.sendToQueue(config.SERVER_QUEUE, { type: 'updateRequestCount', data: 0 });
                await rabbitmq.sendToQueue(config.SERVER_QUEUE, { type: 'rescheduleNextDay', data: '' });
            }

            return;
        } catch (error) {
            if (error.code == 429) {
                await rabbitmq.sendToQueue(config.SERVER_QUEUE, { type: 'rescheduleNextDay', data: '' });
            }

            await logger.error('search engine', 'worker', error.message, error.stack);
        }
    }
}

module.exports = Worker;
