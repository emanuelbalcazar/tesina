'use strict'

/*
|--------------------------------------------------------------------------
| ConfigSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const Config = use('App/Models/Config');
const configs = require('./staging/configs.json');

class ConfigSeeder {

    async run() {
        for (const config of configs) {
            await Config.findOrCreate(config, config);
        }

        console.log('Se cargaron las configuraciones correctamente.');
    }
}

module.exports = ConfigSeeder
