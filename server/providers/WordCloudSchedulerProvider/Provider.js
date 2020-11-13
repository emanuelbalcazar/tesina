'use strict'

const { ServiceProvider } = require('@adonisjs/fold')

class WordCloudSchedulerProvider extends ServiceProvider {
    /**
     * Register namespaces to the IoC container
     *
     * @method register
     *
     * @return {void}
     */
    register() {
        this.app.singleton('WordCloudScheduler', () => {
            return new (require('./WordCloudScheduler'));
        });
    }

    /**
     * Attach context getter when all providers have
     * been registered
     *
     * @method boot
     *
     * @return {void}
     */
    boot() {
        //
    }
}

module.exports = WordCloudSchedulerProvider
