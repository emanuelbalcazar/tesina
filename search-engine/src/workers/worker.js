const rabbitmq = require('../rabbitmq/rabbitmq');

/**
 * @class Worker
 * @author Emanuel Balcazar
 */
class Worker {

    /**
     * Creates an instance of Worker.
     * @param  {string} [exchange='equations']
     * @param  {string} routingKey
     * @param  {object} searcher
     */
    constructor(exchange = 'equations', routingKey, searcher) {
        this.exchange = exchange;
        this.routingKey = routingKey;
        this.searcher = searcher;
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

        this.channel.assertExchange(this.exchange, 'direct', { durable: true });
        let queueInstance = await this.channel.assertQueue('', { exclusive: true });
        await this.channel.bindQueue(queueInstance.queue, this.exchange, this.routingKey);

        console.log(`[${this.routingKey}] - worker esperando nuevos mensajes...`);

        this.channel.consume(queueInstance.queue, async (msg) => {
            console.log('> [%s] %s', this.routingKey, msg.content.toString());
            await this.search(JSON.parse(msg.content.toString()));
        });
    }

    /**
     * Execute a search using http protocol
     * @param  {Object} equation
     * @return {void}
     */
    async search(equation) {
        try {
            let query = await this.searcher.getQuery(equation);
            let searchResults = await this.searcher.search(query);
            let filtered = await this.searcher.filter(searchResults, {});
            let normalized = await this.searcher.normalize(filtered);

            console.log('[%s] - enviar a encolar el resultado de busqueda: %s', this.routingKey, normalized);
        } catch (error) {
            throw new Error(error);
        }
    }
}

module.exports = Worker;
