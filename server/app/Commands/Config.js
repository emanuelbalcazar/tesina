'use strict'

const { Command } = require('@adonisjs/ace');
const Database = use('Database');

class Config extends Command {

    static get signature() {
        return 'config'
    }

    static get description() {
        return 'Configura los parametros del servidor en la base de datos'
    }

    async handle(args, options) {

        let configs = await Database.select('*').from('configs');
        this.success('Configuraciónes disponibles:');

        let configOptions = configs.map(config => {
            return { name: `[${config.key}] - ${config.description} - ${config.value}`, value: config.key }
        });

        const choice = await this
            .choice('¿Que desea configurar?', configOptions)

        const value = await this
            .ask(`Ingrese el valor para ${choice}`);

        let result = await Database.table('configs').where('key', choice).update('value', value);

        this.info('Actualizado: ' + result);

        process.exit(0);
    }
}

module.exports = Config
