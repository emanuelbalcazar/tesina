'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class NormalizedArticlesSchema extends Schema {
    up() {
        this.create('normalized_articles', (table) => {
            table.increments()
            table.string('link', 800).unique();
            table.text('lower_case', 'longtext').defaultTo('');
            table.text('removed_numbers', 'longtext').defaultTo('');
            table.text('removed_stopwords', 'longtext').defaultTo('');
            table.text('removed_accents', 'longtext').defaultTo('');
            table.text('removed_characters', 'longtext').defaultTo('');
            table.text('removed_words', 'longtext').defaultTo('');
            table.text('removed_prepositions', 'longtext').defaultTo('');
            table.text('removed_ends', 'longtext').defaultTo('');
            table.text('lemmatized', 'longtext').defaultTo('');
            table.text('stemmer', 'longtext').defaultTo('');
            table.text('wordcloud', 'longtext').defaultTo('');
            table.integer('article_id').references('id').inTable('articles');
        })
    }

    down() {
        this.drop('normalized_articles')
    }
}

module.exports = NormalizedArticlesSchema
