'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class GlobalWordSchema extends Schema {
    up() {
        this.create('global_words', (table) => {
            table.increments();
            table.string('word', 100).unique().notNullable();
            table.integer('total').defaultTo(0);
        });
    }

    down() {
        this.drop('global_words')
    }
}

module.exports = GlobalWordSchema
