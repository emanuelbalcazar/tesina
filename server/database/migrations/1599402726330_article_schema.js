'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ArticleSchema extends Schema {
    up() {
        this.create('articles', (table) => {
            table.increments()
            table.string('title', 400);
            table.text('snippet', 'longtext').defaultTo('');
            table.string('link', 800).unique();
            table.string('displayLink', 800);
            table.text('body', 'longtext');
            table.string('published', 100);
            table.string('expected_date', 100);
            table.boolean('is_useful').defaultTo(true);
            table.boolean('analyzed').defaultTo(false);
        });
    }

    down() {
        this.drop('articles');
    }
}

module.exports = ArticleSchema
