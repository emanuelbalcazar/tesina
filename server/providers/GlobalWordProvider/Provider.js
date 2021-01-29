'use strict'

const { ServiceProvider } = require('@adonisjs/fold')

class GlobalWordProvider extends ServiceProvider {
    /**
     * Register namespaces to the IoC container
     *
     * @method register
     *
     * @return {void}
     */
    register() {
        this.app.singleton('GlobalWordService', () => {
            return new (require('./GlobalWordService'));
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

module.exports = GlobalWordProvider
