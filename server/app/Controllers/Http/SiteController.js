'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Site = use('App/Models/Site');
const { validate } = use('Validator')

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
        try {
            let params = request.all();
            let sites = await Site.searchByCriteria(params.criteria, params.page, params.perPage);
            return response.json(sites);
        } catch (error) {
            return response.unauthorized({ error: error.message });
        }
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
        try {
            const rules = {
                site: 'required'
            };

            const validation = await validate(request.post(), rules);

            if (validation.fails()) {
                let messages = validation.messages()[0];
                return response.unauthorized({ error: `El campo: ${messages.field} es obligatorio` });
            }

            let site = request.post();

            let count = await Site.query().where({ site: site.site }).getCount();

            if (count > 0)
                return response.conflict({ error: 'El sitio ya existe' })

            let record = await Site.create(site);
            return response.json(record);
        } catch (error) {
            return response.unauthorized({ error: error.message });
        }
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
        try {
            let site = await Site.query().with('selectors').where('id', params.id).first();
            return response.json(site);
        } catch (error) {
            return response.unauthorized({ error: error.message });
        }
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
        try {
            let updated = await Site.query().where('id', params.id).update(request.all());
            let site = await Site.findBy('id', params.id);
            return response.json(site);
        } catch (error) {
            return response.unauthorized({ error: error.message });
        }
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
