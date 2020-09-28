'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Equation extends Model {

    static boot() {
        super.boot();
        this.addTrait('NoTimestamp');
    }

    query() {
        return this.hasOne('App/Models/Query', 'query_id', 'id');
    }

    site() {
        return this.hasOne('App/Models/Site', 'site_id', 'id');
    }

    /**
     * Find equations with selector population
     * @static
     * @param  {Object} [where={}] conditional search
     * @return {Array} equations
     */
    static async findWithPopulate(where = {}) {
        let records = await this.query()
            .with('site', (builder) => { builder.with('selectors') })
            .where(where).fetch();

        return records.toJSON();
    }
}

module.exports = Equation
