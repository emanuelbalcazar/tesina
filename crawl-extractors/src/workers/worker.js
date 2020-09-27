const config = require('../config/config');
const rabbitmq = require('../rabbitmq/rabbitmq');
const service = require('../services/extractor.service');
const logger = require('../services/logger.service');

/**
 * @class Worker
 * @author Emanuel Balcazar
 */
class Worker {

    /**
     * Creates an instance of Worker.
     * @param  {string} routingKey
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
            await logger.info('crawl extractors', `worker ${this.routingKey}`, `ecuacion entrante`, params.equation.id, params.equation.q, params.equation.start);

            await this.extract(JSON.parse(msg.content.toString()));
            this.channel.ack(msg);
        });
    }

    /**
     * Execute a search using http protocol
     * @param  {Object} equation
     * @return {void}
     */
    async extract(message) {
        try {
            let results = await service.extract(message);
            await rabbitmq.sendToQueue(config.PUBLISH_QUEUE, results);
        } catch (error) {
            await logger.error('crawl extractors', `worker ${this.routingKey}`, error.message, error.stack);
        }
    }
}

module.exports = Worker;
