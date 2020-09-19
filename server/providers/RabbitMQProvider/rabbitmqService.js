const amqplib = require('amqplib');
const Config = use('Config');
const Log = use('App/Models/Log');
const Article = use('App/Models/Article');
const Logger = use('Logger');

const RABBITMQ_URL = Config.get('app.rabbitmq');
const LOGS_QUEUE = Config.get('app.logsQueue');
const ARTICLES_QUEUE = Config.get('app.articlesQueue');
const EQUATIONS_EXCHANGE = Config.get('app.equationsExchange');

let connection = null;

/**
 * @class RabbitMQService
 * @author Emanuel Balcazar
 */
class RabbitMQService {

    /**
     * Creates an instance of RabbitMQService.
     * @memberof RabbitMQService
     */
    constructor() { }

    /**
     * @return a rabbitmq connection
     * @memberof RabbitMQService
     */
    async getConnection() {
        try {
            if (!connection)
                connection = await amqplib.connect(RABBITMQ_URL);

            return connection;
        } catch (error) {
            throw new Error(error);
        }
    }

    /**
     * Consume logs from queue
     * @return {void}
     * @memberof RabbitMQService
     */
    async consumeLogs() {
        connection = await this.getConnection();
        let channel = await connection.createChannel();
        channel.assertQueue(LOGS_QUEUE, { durable: true });

        Logger.info('[worker] - esperando logs...');

        channel.consume(LOGS_QUEUE, async (message) => {
            let log = JSON.parse(message.content.toString());
            await Log.create(log);
            channel.ack(message);
        });
    }

    /**
     * Consume articles from queue
     * @return {void}
     * @memberof RabbitMQService
     */
    async consumeArticles() {
        connection = await this.getConnection();
        let channel = await connection.createChannel();
        channel.assertQueue(ARTICLES_QUEUE, { durable: true });

        Logger.info('[worker] - esperando articulos...');

        channel.consume(ARTICLES_QUEUE, async (message) => {
            let extraction = JSON.parse(message.content.toString());
            Logger.info(`[worker] lote de ${extraction.items.length} articulos recibido`);

            for (const article of extraction.items) {
                try {
                    await Article.create(article);
                } catch (error) {
                    console.log('error:', error);
                }
            }

            channel.ack(message);
        });
    }

    /**
     * Send message to equation exchange
     * @param  {Object} message equation
     * @param  {String} routingKey
     * @return
     * @memberof RabbitMQService
     */
    async sendToEquationsExchange(message, routingKey) {
        connection = await this.getConnection();
        let channel = await connection.createChannel();

        Logger.info(`[server] - enviando ecuación con ID: ${message.equation.id} - ${routingKey} a rabbitmq`);

        channel.assertExchange(EQUATIONS_EXCHANGE, 'direct', { durable: true });
        await channel.publish(EQUATIONS_EXCHANGE, routingKey, Buffer.from(JSON.stringify(message)));
        return true;
    }

    /**
     * Send all active equations to rabbitmq
     * @return {void}
     */
    async sendEquationsToRabbitMQ(equations) {
        for (const equation of equations) {
            await this.sendToEquationsExchange(equation, equation.equation.siteSearch);
        }

        return;
    }
}

module.exports = RabbitMQService;
