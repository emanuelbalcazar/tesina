'use strict'

/*
|--------------------------------------------------------------------------
| SelectorSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const Selector = use('App/Models/Selector');
const Site = use('App/Models/Site');
const selectors = require('./staging/selectors.json');

class SelectorSeeder {

    async run() {

        for (const selector of selectors) {
            let site = await Site.query().where({ site: selector.site }).first();
            await Selector.findOrCreate({ selector: selector.selector, site_id: site.id }, { selector: selector.selector, site_id: site.id, section: selector.section });
        }

        console.log('Se cargaron los selectores correctamente.');
    }
}

module.exports = SelectorSeeder
