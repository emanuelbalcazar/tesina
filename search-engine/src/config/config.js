require('dotenv').config()

// declare HOST and PORT.
module.exports.HOST = process.env.HOST || 'http://localhost';
module.exports.PORT = process.env.PORT || 8001;

// declare rabbitmq connection
module.exports.RABBITMQ = process.env.RABBITMQ || 'amqp://localhost:5672/tesina';
module.exports.CONSUMER_EXCHANGE = 'equations';
module.exports.PUBLISH_EXCHANGE = 'searches';
module.exports.SERVER_QUEUE = 'server';

// declare google cse config
module.exports.GOOGLE_API = 'https://www.googleapis.com/customsearch/v1?';
module.exports.CX = process.env.CX;
module.exports.KEY = process.env.KEY;

// logs configuration
module.exports.LOGS_QUEUE_NAME = 'logs';
module.exports.PRINT_LOGS_ON_CONSOLE = true;

// excluded words for article links
module.exports.excludedWords = ['/tag', '/tags', '/seccion', '/impresa/'];

// scheduler nextExecution, default '0 1 */1 * *'
module.exports.RESCHEDULE_CONFIG = '*/1 * * * *';
