import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
    protected tableName = 'sites'

    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id')
            table.string('site').unique()
            table.string('dateFormat').defaultTo('DD/MM/YYYY')
            table.string('description').defaultTo('')
        })
    }

    async down() {
        this.schema.dropTable(this.tableName)
    }
}
