import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Site extends BaseModel {
    @column({ isPrimary: true })
    declare id: number

    @column()
    public site: string | undefined

    @column()
    public dateFormat: string | undefined

    @column()
    public description: string | undefined
}
