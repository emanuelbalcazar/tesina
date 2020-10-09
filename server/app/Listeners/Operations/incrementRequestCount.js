const Config = use('App/Models/Config')

module.exports.execute = async (operation) => {
    let requestCount = await Config.query().where('key', 'requestCount').first();
    let value = Number(requestCount.value) + 1;

    let updated = await Config.query().where('key', 'requestCount').update({ value: value });
    return updated;
}
