'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AlterUserSchema extends Schema {
    up() {
        this.table('users', (table) => {
            // alter table
            table.dropColumn('username');
            table.string('name');
            table.string('surname');
            table.boolean('active').defaultTo(true);
        });
    }

    down() {
        this.table('users', (table) => {
            // reverse alternations
            table.dropColumn('name');
            table.dropColumn('surname');
            table.dropColumn('active');
        })
    }
}

module.exports = AlterUserSchema
