'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Query extends Model {

    static boot() {
        super.boot();
        this.addTrait('NoTimestamp');
    }

    equations() {
        return this.hasMany('App/Models/Equation');
    }
}

module.exports = Query
