const amqplib = require('amqplib');
const config = require('../config/config');
let connection = null;
let channel = null;

/**
 * @class RabbitMQConnector
 * @author Emanuel Balcazar
 */
class RabbitMQConnector {

    constructor() { }

    /**
     * @return a single instance for rabbitmq connector.
     */
    async getConnection() {
        try {
            if (!connection)
                connection = await amqplib.connect(config.RABBITMQ);

            return connection;
        } catch (error) {
            throw new Error(error);
        }
    }

    /**
     * Send a message to queue
     * @param  {String} queueName
     * @param  {Object} message
     * @return {Boolean} status
     * @memberof RabbitMQConnector
     */
    async sendToQueue(queueName, message) {
        if (!channel) {
            channel = await connection.createChannel();
        }

        await channel.assertQueue(queueName, { durable: true });
        const status = await channel.sendToQueue(queueName, Buffer.from(JSON.stringify(message)));
        return status;
    }
}

module.exports = new RabbitMQConnector();
