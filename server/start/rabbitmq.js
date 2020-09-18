const RabbitMQ = use('RabbitMQ');

async function start() {
    await RabbitMQ.consumeLogs();
    await RabbitMQ.consumeArticles();
    await RabbitMQ.sendEquationsToRabbitMQ();
}

start();
