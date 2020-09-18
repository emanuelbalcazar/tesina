const Logger = use('Logger');
const nodeScheduler = require('node-schedule');
const RabbitMQ = use('RabbitMQ');

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
    }

    /**
     * Start the scheduler
     * @return {void}
     */
    async start() {

        this.job = nodeScheduler.scheduleJob('* * * * *', async (fireDate) => {
            RabbitMQ.sendEquationsToRabbitMQ();
        });
    }
}

module.exports = new Scheduler();
