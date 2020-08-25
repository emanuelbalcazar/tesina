const amqplib = require('amqplib');
const config = require('../config/config');
let connection = null;

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
}

module.exports = new RabbitMQConnector();
