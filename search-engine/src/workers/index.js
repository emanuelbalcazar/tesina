const Worker = require('./worker');
const factory = require('../searcher/index');
const Google = factory.getSearcher("google");

const workersConfig = require('./workers.json').workers;

/**
 * @class WorkerManagement
 * @author Emanuel Balcazar
 */
class WorkerManagement {

    constructor() { }

    /**
     * Initialize all workers
     * @return {void}
     */
    async startAllWorkers() {
        workersConfig.forEach(async config => {
            let worker = new Worker(config.key, Google);
            worker.start();
        });
    }
}

module.exports = new WorkerManagement();
