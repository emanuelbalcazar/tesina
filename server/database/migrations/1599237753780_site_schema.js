'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SiteSchema extends Schema {
    up() {
        this.create('sites', (table) => {
            table.increments();
            table.string('site').unique();
            table.string('description').defaultTo('');
        })
    }

    down() {
        this.drop('sites')
    }
}

module.exports = SiteSchema
