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
            await logger.info('search engine', `worker ${this.routingKey}`, `ecuacion de ID: ${params.equation.id} entrante desde rabbitmq`);
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
            let requestCount = 0;
            let hasPages = true;

            while ((requestCount < requestLimit)) {
                let results = await service.search(params);

                this.channel.assertExchange(config.PUBLISH_EXCHANGE, 'direct', { durable: true });
                await this.channel.publish(config.PUBLISH_EXCHANGE, this.routingKey, Buffer.from(JSON.stringify(results)));

                hasPages = ((results.nextPage.startIndex <= 100) && (params.equation.start <= results.nextPage.startIndex)) ? true : false;

                params.equation.start = (results.nextPage) ? results.nextPage.startIndex : params.equation.start;
                requestCount++;

                // update database values
                await rabbitmq.sendToQueue(config.SERVER_QUEUE, { type: 'updateRequestCount', data: requestCount });
                await rabbitmq.sendToQueue(config.SERVER_QUEUE, { type: 'updateEquationStart', data: { id: params.equation.id, start: params.equation.start } });
            }

            if (!hasPages && requestCount < requestLimit) {
                await rabbitmq.sendToQueue(config.SERVER_QUEUE, { type: 'getNextEquationDate', data: { id: params.equation.id } });
            } else {
                // reset requestCount and equation start
                await rabbitmq.sendToQueue(config.SERVER_QUEUE, { type: 'updateRequestCount', data: 0 });
                await rabbitmq.sendToQueue(config.SERVER_QUEUE, { type: 'updateEquationStart', data: { id: params.equation.id, start: 1 } });
            }

            return;
        } catch (error) {
            if (error.code == 429) {
                await rabbitmq.sendToQueue(config.SERVER_QUEUE, { type: 'reschedule', data: config.RESCHEDULE_CONFIG });
            }

            await logger.info('search engine', 'worker', error.message, error.stack);
        }
    }
}

module.exports = Worker;
