const amqplib = require('amqplib');
const Config = use('Config');
const Log = use('App/Models/Log');
const RABBITMQ_URL = Config.get('app.rabbitmq');
const LOGS_QUEUE = Config.get('app.logsQueue');

let connection = null;

class RabbitMQService {

    constructor() { }

    async getConnection() {
        try {
            if (!connection)
                connection = await amqplib.connect(RABBITMQ_URL);

            return connection;
        } catch (error) {
            throw new Error(error);
        }
    }

    async consumeLogs() {
        connection = await this.getConnection();
        let channel = await connection.createChannel();
        channel.assertQueue(LOGS_QUEUE, { durable: true });

        channel.consume(LOGS_QUEUE, async (message) => {
            let log = JSON.parse(message.content.toString());
            await Log.create(log);
            channel.ack(message);
        });
    }
}

module.exports = RabbitMQService;
