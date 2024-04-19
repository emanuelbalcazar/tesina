import UserService from '#services/user_service'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'

@inject()
export default class UsersController {
    constructor(protected service: UserService) {}

    /**
     * Display a list of resource
     */
    async index({ request }: HttpContext) {
        const params = request.all()
        return this.service.paginate(params.page, params.perPage)
    }

    /**
     * Handle form submission for the create action
     */
    async store() {}

    /**
     * Show individual record
     */
    async show() {}

    /**
     * Edit individual record
     */
    async edit() {}

    /**
     * Handle form submission for the edit action
     */
    async update() {}

    /**
     * Delete record
     */
    async destroy() {}
}
