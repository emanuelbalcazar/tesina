require('dotenv').config()

// declare HOST and PORT.
module.exports.HOST = process.env.HOST || 'http://localhost';
module.exports.PORT = process.env.PORT || 8002;

// declare rabbitmq connection
module.exports.RABBITMQ = process.env.RABBITMQ || 'amqp://localhost:5672/tesina';
module.exports.CONSUMER_EXCHANGE = 'searches';
module.exports.PUBLISH_QUEUE = 'articles';

module.exports.LOGS_QUEUE_NAME = 'logs';
module.exports.PRINT_LOGS_ON_CONSOLE = true;
