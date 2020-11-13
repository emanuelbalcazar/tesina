const Config = use('App/Models/Config');
const Logger = use('Logger');
const Scheduler = use('Scheduler');

const WordCloudScheduler = use('WordCloudScheduler');

async function start() {
    let scheduleOnStart = await Config.query().where('key', 'scheduleOnStart').first();
    let scheduleEvery = await Config.query().where('key', 'scheduleEvery').first();

    if (scheduleOnStart.value == 'true') {
        Logger.info(`[server] - iniciando planificador con periodicidad: ${scheduleEvery.value}`);
        Scheduler.setScheduleEvery(scheduleEvery.value);
        Scheduler.start();
    }

    // always must be run
    let wordCloudEvery = await Config.query().where('key', 'wordcloudScheduler').first();
    Logger.info(`[server] - iniciando constructor de nubes de palabras con periodicidad: ${wordCloudEvery.value}`);
    WordCloudScheduler.setScheduleEvery(wordCloudEvery.value);
    WordCloudScheduler.start();
}

start();
