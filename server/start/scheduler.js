const Config = use('App/Models/Config');
const Logger = use('Logger');
const Scheduler = require('../app/Tasks/Scheduler');

async function start() {
    let scheduleOnStart = await Config.query().where('key', 'scheduleOnStart').first();

    if (scheduleOnStart.value == 'true') {
        Logger.info('[server] - iniciando planificador...');
        Scheduler.start();
    }
}

start();
