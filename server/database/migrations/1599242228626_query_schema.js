'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class QuerySchema extends Schema {
    up() {
        this.create('queries', (table) => {
            table.increments();
            table.string('q', 250).notNullable();
            table.string('siteSearchFilter', 200).notNullable().defaultTo('i');
        });
    }

    down() {
        this.drop('queries');
    }
}

module.exports = QuerySchema
