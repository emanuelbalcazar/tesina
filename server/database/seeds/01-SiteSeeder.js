'use strict'

/*
|--------------------------------------------------------------------------
| SiteSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const Site = use('App/Models/Site');
const sites = require('./staging/sites.json');

class SiteSeeder {

    async run() {

        for (const site of sites) {
            await Site.findOrCreate({ site: site.site }, site);
        }

        console.log('Se cargaron los sitios correctamente.');
    }
}

module.exports = SiteSeeder
