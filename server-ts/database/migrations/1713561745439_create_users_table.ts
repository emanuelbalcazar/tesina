import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
    protected tableName = 'users'

    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id')
            table.string('name')
            table.string('surname')
            table.string('email').notNullable()
            table.string('password').notNullable()
            table.string('role').defaultTo('normal')
        })
    }

    async down() {
        this.schema.dropTable(this.tableName)
    }
}
