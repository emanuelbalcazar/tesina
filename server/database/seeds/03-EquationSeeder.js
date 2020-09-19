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

const Site = use('App/Models/Site');
const Equation = use('App/Models/Equation');
const equations = require('./staging/equations.json');

class EquationSeeder {

    async run() {
        for (const equation of equations) {
            let site = await Site.query().where({ site: equation.site }).first();
            await Equation.findOrCreate({ site_id: site.id }, { site_id: site.id, dateToFind: equation.dateToFind, start: equation.start, active: equation.active });
        }

        console.log('Se cargaron las ecuaciones correctamente.');
    }
}

module.exports = EquationSeeder
