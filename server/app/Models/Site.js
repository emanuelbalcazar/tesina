'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Site extends Model {

    static boot() {
        super.boot();
        this.addTrait('NoTimestamp');
    }

    static async searchByCriteria(criteria = '', page, perPage) {
        if (!page || page == undefined || page == null)
            return await this.query().where('site', 'ilike', `%${criteria}%`).fetch();

        return await this.query().where('site', 'ilike', `%${criteria}%`).paginate(page, perPage);
    }

    selectors() {
        return this.hasMany('App/Models/Selector');
    }
}

module.exports = Site
