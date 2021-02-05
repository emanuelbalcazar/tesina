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

    static async searchByCriteria(criteria = '', page, perPage) {
        if (!page || page == undefined || page == null)
            return await this.query().where('link', 'ilike', `%${criteria}%`).orWhere('wordcloud', 'ilike', `%${criteria}%`).orderBy('id', 'asc').fetch();

        return await this.query().where('link', 'ilike', `%${criteria}%`).orWhere('wordcloud', 'ilike', `%${criteria}%`).orderBy('id', 'asc').paginate(page, perPage);
    }

    article() {
        return this.belongsTo('App/Models/Article');
    }
}

module.exports = NormalizedArticle
