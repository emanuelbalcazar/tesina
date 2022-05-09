const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

// declare HOST and PORT.
module.exports.HOST = process.env.HOST || 'http://localhost';
module.exports.PORT = process.env.PORT || 8001;

// declare rabbitmq connection
module.exports.CONNECT_TO_RABBIT = (process.env.CONNECT_TO_RABBIT === 'true') ?? true;
module.exports.RABBITMQ = process.env.RABBITMQ || 'amqp://localhost:5672/tesina';
module.exports.CONSUMER_EXCHANGE = 'equations';
module.exports.PUBLISH_EXCHANGE = 'searches';
module.exports.SERVER_QUEUE = 'server';

// declare google cse config, options:
// https://www.googleapis.com/customsearch/v1/siterestrict?
// https://www.googleapis.com/customsearch/v1?
module.exports.GOOGLE_API = process.env.GOOGLE_API || 'https://www.googleapis.com/customsearch/v1?';
module.exports.CX = process.env.CX;
module.exports.KEY = process.env.KEY;

// logs configuration
module.exports.LOGS_QUEUE_NAME = 'logs';
module.exports.PRINT_LOGS_ON_CONSOLE = (process.env.PRINT_LOGS_ON_CONSOLE === 'true') ?? true;

// timeout of each request in the worker
module.exports.WORKER_SLEEP_TIME = 8000;
