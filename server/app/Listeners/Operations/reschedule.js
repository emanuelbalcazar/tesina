const Scheduler = use('Scheduler');
const Config = use('App/Models/Config');

module.exports.execute = async (operation) => {
    let state = await Scheduler.reschedule(operation.data);
    await Config.query().where('key', 'scheduleEvery').update({ value: operation.data });
    return state;
}
