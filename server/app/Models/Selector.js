'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Selector extends Model {

    static boot() {
        super.boot();
        this.addTrait('NoTimestamp');
    }

    static async searchByCriteria(criteria = '', page, perPage) {
        if (!page || page == undefined || page == null)
            return await this.query().where('section', 'ilike', `%${criteria}%`).fetch();

        return await this.query().where('section', 'ilike', `%${criteria}%`).paginate(page, perPage);
    }

    site() {
        return this.hasOne('App/Models/Site');
    }
}

module.exports = Selector
