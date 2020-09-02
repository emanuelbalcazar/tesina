'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class LogSchema extends Schema {
    up() {
        this.create('logs', (table) => {
            table.increments()
            table.string('level', 50);
            table.string('component', 150);
            table.string('operation', 150);
            table.string('message', 250);
            table.text('stack', 'longtext');
            table.datetime('date');
        })
    }

    down() {
        this.drop('logs')
    }
}

module.exports = LogSchema
