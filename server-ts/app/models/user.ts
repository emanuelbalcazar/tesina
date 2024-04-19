import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class User extends BaseModel {
    @column({ isPrimary: true })
    declare id: number

    @column()
    public name: string | undefined

    @column()
    public surname: string | undefined

    @column()
    public email: string | undefined

    @column()
    public password: string | undefined

    @column()
    public role: string | undefined

    static get hidden() {
        return ['password']
    }
}
