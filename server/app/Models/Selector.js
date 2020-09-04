'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Selector extends Model {

    static boot() {
        super.boot();
        this.addTrait('NoTimestamp');
    }

    site() {
        return this.hasOne('App/Models/Site');
    }
}

module.exports = Selector
