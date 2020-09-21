const Scheduler = use('Scheduler');
const Config = use('App/Models/Config');

module.exports.execute = async (operation) => {
    let nextDayCron = await Config.query().where('key', 'nextDayCron').first();
    let state = await Scheduler.reschedule(nextDayCron.value);
    await Config.query().where('key', 'scheduleEvery').update({ value: nextDayCron.value });
    return state;
}
