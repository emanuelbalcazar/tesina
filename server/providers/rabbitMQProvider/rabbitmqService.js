const amqplib = require('amqplib');
const Config = use('Config');
const Log = use('App/Models/Log');
const Article = use('App/Models/Article');

const Logger = use('Logger');

const RABBITMQ_URL = Config.get('app.rabbitmq');
const LOGS_QUEUE = Config.get('app.logsQueue');
const ARTICLES_QUEUE = Config.get('app.articlesQueue');

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

    async consumeArticles() {
        connection = await this.getConnection();
        let channel = await connection.createChannel();
        channel.assertQueue(ARTICLES_QUEUE, { durable: true });

        Logger.info('[worker] esperando articulos...');

        channel.consume(ARTICLES_QUEUE, async (message) => {
            let extraction = JSON.parse(message.content.toString());

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
}

module.exports = RabbitMQService;
