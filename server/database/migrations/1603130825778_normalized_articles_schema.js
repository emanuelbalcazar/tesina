'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class NormalizedArticlesSchema extends Schema {
    up() {
        this.create('normalized_articles', (table) => {
            table.increments()
            table.string('link', 800).unique();
            table.text('lower_case', 'longtext');
            table.text('removed_numbers', 'longtext');
            table.text('removed_stopwords', 'longtext');
            table.text('removed_accents', 'longtext');
            table.text('removed_characters', 'longtext');
            table.text('removed_words', 'longtext');
            table.text('removed_prepositions', 'longtext');
            table.text('removed_ends', 'longtext');
            table.text('lemmatized', 'longtext');
            table.text('stemmer', 'longtext');
            table.text('wordcloud', 'longtext');
            table.boolean('in_wordcloud').defaultTo(false);
            table.integer('article_id').references('id').inTable('articles');
        });
    }

    down() {
        this.drop('normalized_articles')
    }
}

module.exports = NormalizedArticlesSchema
