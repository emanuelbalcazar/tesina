'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class EquationSchema extends Schema {
    up() {
        this.create('equations', (table) => {
            table.increments();
            table.date('dateToFind');
            table.integer('site_id').references('id').inTable('sites');
            table.integer('start').defaultTo(1);
            table.string('siteSearchFilter').defaultTo('i');
            table.date('lastExecution');
            table.boolean('active').defaultTo(true);
        })
    }

    down() {
        this.drop('equations')
    }
}

module.exports = EquationSchema
