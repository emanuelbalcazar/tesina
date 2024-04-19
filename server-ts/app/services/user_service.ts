import User from '#models/user'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'

@inject()
export default class UserService {
    constructor(protected ctx: HttpContext) {}

    async all() {
        return User.all()
    }

    async paginate(page: number = 1, perPage: number = 10) {
        return User.query().paginate(page, perPage)
    }
}
