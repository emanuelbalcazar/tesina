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
}

module.exports = Article
