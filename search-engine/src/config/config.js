require('dotenv').config()

// declare HOST and PORT.
module.exports.HOST = process.env.HOST || 'http://localhost';
module.exports.PORT = process.env.PORT || 8001;

// declare rabbitmq connection
module.exports.RABBITMQ = process.env.RABBITMQ || 'amqp://localhost:5672/tesina';
module.exports.CONSUMER_EXCHANGE = 'equations';
module.exports.PUBLISH_EXCHANGE = 'searches';

// declare google cse config
module.exports.GOOGLE_API = 'https://www.googleapis.com/customsearch/v1?';
module.exports.CX = process.env.CX;
module.exports.KEY = process.env.KEY;

module.exports.LOGS_QUEUE_NAME = 'logs';
module.exports.PRINT_LOGS_ON_CONSOLE = true;

module.exports.excludedWords = ['/tag', '/tags', '/seccion', '/impresa/'];
