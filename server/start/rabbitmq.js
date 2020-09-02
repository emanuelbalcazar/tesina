const RabbitMQ = use('RabbitMQ');

async function start() {
    await RabbitMQ.consumeLogs();
}

start();
