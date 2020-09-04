'use strict'

/*
|--------------------------------------------------------------------------
| QuerySeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const Query = use('App/Models/Query');
const queries = require('./staging/queries.json');

class QuerySeeder {

    async run() {
        for (const query of queries) {
            await Query.findOrCreate(query, query);
        }

        console.log('Se cargaron las consultas correctamente.');
    }
}

module.exports = QuerySeeder
