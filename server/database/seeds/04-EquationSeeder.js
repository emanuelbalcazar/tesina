'use strict'

/*
|--------------------------------------------------------------------------
| EquationSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const Query = use('App/Models/Query');
const Site = use('App/Models/Site');
const Equation = use('App/Models/Equation');
const equations = require('./staging/equations.json');

class EquationSeeder {

    async run() {
        for (const equation of equations) {
            let query = await Query.query().where({ q: equation.query }).first();
            let site = await Site.query().where({ site: equation.site }).first();

            await Equation.findOrCreate({ query_id: query.id, site_id: site.id }, { query_id: query.id, site_id: site.id, start: equation.start, active: equation.active });
        }

        console.log('Se cargaron las ecuaciones correctamente.');
    }
}

module.exports = EquationSeeder
