'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class WordCloudSiteSchema extends Schema {
    up() {
        this.create('word_cloud_sites', (table) => {
            table.increments();
            table.string('word', 80).notNullable();
            table.integer('frecuency').defaultTo(0);
            table.string('site');
            table.integer('normalized_article_id').references('id').inTable('normalized_articles');
        });
    }

    down() {
        this.drop('word_cloud_sites')
    }
}

module.exports = WordCloudSiteSchema
