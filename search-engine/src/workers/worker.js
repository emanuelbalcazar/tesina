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
            let params = message;
            let requestCount = 0;
            let hasPages = true;

            while ((requestCount < message.requestLimit) && hasPages) {
                let results = await service.search(params);
                this.channel.assertExchange(config.PUBLISH_EXCHANGE, 'direct', { durable: true });
                await this.channel.publish(config.PUBLISH_EXCHANGE, this.routingKey, Buffer.from(JSON.stringify(results)));

                hasPages = (params.equation.start <= results.nextPage.startIndex) ? true : false;
                params.equation.start = (results.nextPage) ? results.nextPage.startIndex : params.equation.start;
                requestCount++;
            }

            // TODO Si termino sus request, no hacer nada. Si termino su ecuacion, pedir mas.
            // TODO verificar si el limite de paginas sigue siendo 10.
            // TODO si reinicio el worker, debe saber cuantos request hizo
        } catch (error) {
            throw new Error(error);
        }
    }
}

module.exports = Worker;
