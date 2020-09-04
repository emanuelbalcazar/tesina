'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Site = use('App/Models/Site');

/**
 * Resourceful controller for interacting with sites
 */
class SiteController {
    /**
     * Show a list of all sites.
     * GET sites
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */
    async index({ request, response, view }) {
        let params = request.all();
        params.columnName = params.columnName || 'site';
        params.columnValue = params.columnValue || '';

        if (params.page == "all")
            return await Site.all();

        let sites = await Site.query().with('selectors')
            .where(params.columnName, 'ILIKE', `%${params.columnValue}%`).paginate(params.page, params.perPage);

        return response.json(sites);
    }

    /**
     * Render a form to be used for creating a new site.
     * GET sites/create
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */
    async create({ request, response, view }) {
    }

    /**
     * Create/save a new site.
     * POST sites
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async store({ request, response }) {
        let site = request.post();

        let count = await Site.query().where({ site: site.site }).getCount();

        if (count > 0)
            return response.conflict({ code: 409, message: 'El sitio ya existe' })

        let record = await Site.create(site);
        return response.json(record);
    }

    /**
     * Display a single site.
     * GET sites/:id
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */
    async show({ params, request, response, view }) {
        let site = await Site.query().with('selectors').where('id', params.id).first();
        return response.json(site);
    }

    /**
     * Render a form to update an existing site.
     * GET sites/:id/edit
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */
    async edit({ params, request, response, view }) {
    }

    /**
     * Update site details.
     * PUT or PATCH sites/:id
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async update({ params, request, response }) {
        let updated = await Site.query().where('id', params.id).update(request.all());
        return response.json({ updated: updated });
    }

    /**
     * Delete a site with id.
     * DELETE sites/:id
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async destroy({ params, request, response }) {
    }
}

module.exports = SiteController
