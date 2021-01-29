'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class GlobalWord extends Model {

    static boot() {
        super.boot();
        this.addTrait('NoTimestamp');
    }

    static async create(word, frecuency = 0) {
        try {

            let record = await this.findBy('word', word);
            let value = (isNaN(frecuency)) ? 0 : frecuency;

            if (record != null || record != undefined) {
                record.total = record.total + value;
                record.save();
            } else {
                record = await this.query().insert({ word: word, total: value });
            }

            return record;
        } catch (error) {
            throw error;
        }
    }

    static async searchByCriteria(criteria = '', page, perPage) {
        if (!page || page == undefined || page == null)
            return await this.query().where('word', 'ilike', `%${criteria}%`).orderBy('word', 'asc').fetch();

        return await this.query().where('word', 'ilike', `%${criteria}%`).orderBy('word', 'asc').paginate(page, perPage);
    }
}

module.exports = GlobalWord;
