'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Log extends Model {

    static boot() {
        super.boot();
        this.addTrait('NoTimestamp');
    }

    static async searchByCriteria(criteria = '', page, perPage) {
        if (!page || page == undefined || page == null)
            return await this.query().where('level', 'ilike', `%${criteria}%`).orWhere('component', 'ilike', `%${criteria}%`).orWhere('operation', 'ilike', `%${criteria}%`).orWhere('message', 'ilike', `%${criteria}%`).fetch();

        return await this.query().where('level', 'ilike', `%${criteria}%`).orWhere('component', 'ilike', `%${criteria}%`).orWhere('operation', 'ilike', `%${criteria}%`).orWhere('message', 'ilike', `%${criteria}%`).paginate(page, perPage);
    }

}

module.exports = Log
