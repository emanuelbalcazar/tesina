const RabbitMQ = use('RabbitMQ');

async function start() {
    await RabbitMQ.consumeLogs();
    await RabbitMQ.consumeArticles();
}

start();
