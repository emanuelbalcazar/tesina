'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SelectorSchema extends Schema {
    up() {
        this.create('selectors', (table) => {
            table.increments()
            table.string('selector').notNullable();
            table.string('section').defaultTo('');
            table.integer('site_id').references('id').inTable('sites');
        });
    }

    down() {
        this.drop('selectors')
    }
}

module.exports = SelectorSchema
