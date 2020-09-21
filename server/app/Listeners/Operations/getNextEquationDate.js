const Equation = use('App/Models/Equation')
const Util = use('Util');
const Config = use('App/Models/Config');
const RabbitMQ = use('RabbitMQ');
const moment = require('moment');

module.exports.execute = async (operation) => {
    let equations = await Equation.findWithPopulate({ id: operation.data.id });
    let equation = equations[0];

    // calculate request limit for every worker
    let requestLimit = await Config.query().where('key', 'requestLimit').first();
    let workers = await Config.query().where('key', 'workers').first();
    requestLimit = Math.floor(requestLimit.value / workers.value);

    // calculate next day
    let nextDate = moment(equation.dateToFind).add(1, 'day');
    equation.dateToFind = nextDate;

    let message = Util.normalizeEquation(equation);
    message.requestLimit = requestLimit;

    // send equation to rabbitmq and update dateToFind
    RabbitMQ.sendEquationsToRabbitMQ([message]);

    let updated = await Equation.query().where('id', operation.data.id).update({ dateToFind: nextDate });
    return updated;
}
