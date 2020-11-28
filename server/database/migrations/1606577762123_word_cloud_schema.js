'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class WordCloudSchema extends Schema {
    up() {
        this.create('word_clouds', (table) => {
            table.increments();
            table.string('word', 80).notNullable();
            table.integer('frecuency').defaultTo(0);
            table.string('site');
            table.date('date');
            table.integer('normalized_article_id').references('id').inTable('normalized_articles');
        })
    }

    down() {
        this.drop('word_clouds')
    }
}

module.exports = WordCloudSchema
