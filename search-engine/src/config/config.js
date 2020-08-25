// declare HOST and PORT.
module.exports.HOST = process.env.HOST || 'http://localhost';
module.exports.PORT = process.env.PORT || 8000;

module.exports.RABBITMQ = process.env.RABBITMQ || 'amqp://localhost:5672/tesina';

module.exports.GOOGLE_API = 'https://www.googleapis.com/customsearch/v1?';
module.exports.CX = process.env.CX;
module.exports.KEY = process.env.KEY;
