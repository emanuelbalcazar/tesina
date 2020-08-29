const Worker = require('./worker');
const factory = require('../extractors/index');
const Extractor = factory.getExtractor("default");

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
            let worker = new Worker(config.key, Extractor);
            worker.start();
        });
    }
}

module.exports = new WorkerManagement();
