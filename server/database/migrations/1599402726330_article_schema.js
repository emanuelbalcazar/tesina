'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ArticleSchema extends Schema {
    up() {
        this.create('articles', (table) => {
            table.increments()
            table.string('title', 300);
            table.string('link', 800).unique();
            table.string('snippet', 800);
            table.text('text', 'longtext');
        });
    }

    down() {
        this.drop('articles');
    }
}

module.exports = ArticleSchema
