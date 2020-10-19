'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class NormalizedArticle extends Model {

    static boot() {
        super.boot();
        this.addTrait('NoTimestamp');
    }

    article() {
        return this.hasOne('App/Models/Article');
    }
}

module.exports = NormalizedArticle
