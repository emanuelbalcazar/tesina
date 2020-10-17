const Equation = use('App/Models/Equation')
const Util = use('Util');
const Config = use('App/Models/Config');
const RabbitMQ = use('RabbitMQ');
const moment = require('moment');

const MIN_NUMBER_OF_DAYS = 14;

module.exports.execute = async (operation) => {
    try {
        let equations = await Equation.findWithPopulate({ id: operation.data.id });
        let equation = equations[0];
        let today = moment();

        let numberOfDays = moment(today).diff(equation.dateToFind, 'days');

        // the equation is not executed if I do not spend a minimum number of days
        if (numberOfDays < MIN_NUMBER_OF_DAYS) {
            return false;
        }

        // calculate request limit for every worker
        let requestLimit = await Config.query().where('key', 'requestLimit').first();
        let workers = await Config.query().where('key', 'workers').first();
        requestLimit = Math.floor(requestLimit.value / workers.value);

        // calculate next day
        let nextDate = moment(equation.dateToFind).add(1, 'day');
        equation.dateToFind = nextDate;

        // normalize equation and set request limit
        let message = Util.normalizeEquation(equation);
        message.requestLimit = requestLimit;

        // send equation to rabbitmq and update dateToFind
        RabbitMQ.sendEquationsToRabbitMQ([message]);

        let updated = await Equation.query().where('id', operation.data.id).update({ dateToFind: nextDate });
        return updated;
    } catch (error) {
        throw error;
    }
}
