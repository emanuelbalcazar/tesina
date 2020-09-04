'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class EquationSchema extends Schema {
    up() {
        this.create('equations', (table) => {
            table.increments()
            table.integer('query_id').references('id').inTable('queries');
            table.integer('site_id').references('id').inTable('sites');
            table.integer('start').defaultTo(1);
            table.boolean('active').defaultTo(true);
        })
    }

    down() {
        this.drop('equations')
    }
}

module.exports = EquationSchema
