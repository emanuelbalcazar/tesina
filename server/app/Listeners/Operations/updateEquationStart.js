const Equation = use('App/Models/Equation')

module.exports.execute = async (operation) => {
    let updated = await Equation.query().where('id', operation.data.id).update({ start: operation.data.start, lastExecution: new Date() });
    return updated;
}
