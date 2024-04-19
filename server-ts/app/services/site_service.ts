import Site from '#models/site'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'

@inject()
export default class SiteService {
    constructor(protected ctx: HttpContext) {}

    async all() {
        return Site.all()
    }

    async paginate(page: number = 1, perPage: number = 10) {
        return Site.query().paginate(page, perPage)
    }

    async create(site: any) {
        return Site.create(site)
    }

    async findById(id: number) {
        return Site.findBy('id', id)
    }
}
