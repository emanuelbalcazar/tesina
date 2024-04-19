import SiteService from '#services/site_service'
import { createSiteValidator } from '#validators/site'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class SitesController {
    constructor(protected service: SiteService) {}

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
    async store({ request }: HttpContext) {
        const payload = await request.validateUsing(createSiteValidator)
        return this.service.create(payload)
    }

    /**
     * Show individual record
     */
    async show({ params }: HttpContext) {
        return this.service.findById(params.id)
    }

    /**
     * Handle form submission for the edit action
     */
    async update({ params, request }: HttpContext) {}

    /**
     * Delete record
     */
    async destroy({ params }: HttpContext) {}
}
