const Logger = use('Logger');
const nodeScheduler = require('node-schedule');
const RabbitMQ = use('RabbitMQ');
const Equation = use('App/Models/Equation');
const Util = use('Util');
const Config = use('App/Models/Config');

/**
 * @class Scheduler
 * @author Emanuel Balcazar
 */
class Scheduler {

    /**
     * Creates an instance of Scheduler.
     * @memberof Scheduler
     */
    constructor() {
        this.job = {}
        this.scheduleEvery = '';
    }

    setScheduleEvery(every) {
        this.scheduleEvery = every;
    }

    getScheduleEvery() {
        return this.scheduleEvery;
    }

    /**
     * Start the scheduler
     * @return {void}
     */
    async start() {
        this.job = nodeScheduler.scheduleJob(this.scheduleEvery, async (fireDate) => {
            Logger.info(`[${this.scheduleEvery}] - ejecutando planificador en ${fireDate}`);

            let equations = await Equation.findWithPopulate({ active: true });

            let requestLimit = await Config.query().where('key', 'requestLimit').first();
            let workers = await Config.query().where('key', 'workers').first();

            requestLimit = Math.floor(requestLimit.value / workers.value);
            let messages = [];

            for (const equation of equations) {
                let message = Util.normalizeEquation(equation);
                message.requestLimit = requestLimit;
                messages.push(message);
            }

            RabbitMQ.sendEquationsToRabbitMQ(messages);
        });
    }

    async reschedule(scheduleAt) {
        Logger.info('[scheduler] - replanificando en ' + scheduleAt);
        this.setScheduleEvery(scheduleAt);
        let state = await this.job.reschedule(scheduleAt);
        return state;
    }

    async cancel() {
        Logger.info('[scheduler] - cancelando planificador');
        await this.job.cancel();
    }
}

module.exports = Scheduler;
