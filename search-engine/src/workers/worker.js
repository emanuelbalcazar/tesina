const config = require('../config/config');
const rabbitmq = require('../rabbitmq/rabbitmq');
const service = require('../services/search.service');

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
            console.log('> [%s] Nuevo mensaje entrante.', this.routingKey);
            await this.search(JSON.parse(msg.content.toString()));
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
            let results = await service.search(message);
            this.channel.assertExchange(config.PUBLISH_EXCHANGE, 'direct', { durable: true });
            this.channel.publish(config.PUBLISH_EXCHANGE, this.routingKey, Buffer.from(JSON.stringify(results)));
        } catch (error) {
            throw new Error(error);
        }
    }
}

module.exports = Worker;
