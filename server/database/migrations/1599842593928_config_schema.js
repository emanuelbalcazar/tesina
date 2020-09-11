'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ConfigSchema extends Schema {
    up() {
        this.create('configs', (table) => {
            table.increments()
            table.string('key').unique();
            table.string('value').defaultTo('');
            table.string('description').defaultTo('');
        });
    }

    down() {
        this.drop('configs')
    }
}

module.exports = ConfigSchema
