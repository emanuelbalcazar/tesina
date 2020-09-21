const Config = use('App/Models/Config')

module.exports.execute = async (operation) => {
    let updated = await Config.query().where('key', 'requestCount').update({ value: operation.data });
    return updated;
}
