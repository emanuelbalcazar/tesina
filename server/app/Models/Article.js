'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Article extends Model {

    static boot() {
        super.boot();
        this.addTrait('NoTimestamp');
    }

    static async findByExpectedDate(date) {
        let articles = await Article.query().select('id').where('expected_date', date).fetch();
        return articles;
    }

    static async searchByCriteria(criteria = '', page, perPage) {
        if (!page || page == undefined || page == null)
            return await this.query().where('title', 'ilike', `%${criteria}%`).orWhere('link', 'ilike', `%${criteria}%`).orWhere('body', 'ilike', `%${criteria}%`).orWhere('published', 'ilike', `%${criteria}%`).orderBy('id', 'asc').fetch();

        return await this.query().where('title', 'ilike', `%${criteria}%`).orWhere('link', 'ilike', `%${criteria}%`).orWhere('body', 'ilike', `%${criteria}%`).orWhere('published', 'ilike', `%${criteria}%`).orderBy('id', 'asc').paginate(page, perPage);
    }
}

module.exports = Article
