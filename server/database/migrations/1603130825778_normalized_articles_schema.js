'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class NormalizedArticlesSchema extends Schema {
    up() {
        this.create('normalized_articles', (table) => {
            table.increments()
            table.text('body', 'longtext');
            table.integer('article_id').references('id').inTable('articles');
        })
    }

    down() {
        this.drop('normalized_articles')
    }
}

module.exports = NormalizedArticlesSchema
