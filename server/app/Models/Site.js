'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Site extends Model {

    static boot() {
        super.boot();
        this.addTrait('NoTimestamp');
    }

    selectors() {
        return this.hasMany('App/Models/Selector');
    }
}

module.exports = Site