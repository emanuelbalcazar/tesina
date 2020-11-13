'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class NormalizedArticle extends Model {

    static boot() {
        super.boot();
        this.addTrait('NoTimestamp');
    }

    static async setArticleInWordCloud(id, value) {
        return await this.query().where('id', id).update({ in_wordcloud: value })
    }

    article() {
        return this.belongsTo('App/Models/Article');
    }
}

module.exports = NormalizedArticle
