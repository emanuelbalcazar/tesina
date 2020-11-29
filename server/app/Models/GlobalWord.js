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
}

module.exports = GlobalWord
