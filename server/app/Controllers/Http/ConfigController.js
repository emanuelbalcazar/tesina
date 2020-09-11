'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Config = use('App/Models/Config');

/**
 * Resourceful controller for interacting with configs
 */
class ConfigController {
    /**
     * Show a list of all configs.
     * GET configs
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */
    async index({ request, response, view }) {
        let params = request.all();

        if (params.page == "all")
            return await Config.all();

        let configs = await Config.query().paginate(params.page, params.perPage);
        return response.json(configs);
    }

    /**
     * Render a form to be used for creating a new config.
     * GET configs/create
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */
    async create({ request, response, view }) {
    }

    /**
     * Create/save a new config.
     * POST configs
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async store({ request, response }) {
        let config = request.post();
        let count = await Config.query().where({ key: config.key }).getCount();

        if (count > 0)
            return response.conflict({ code: 409, message: 'La configuración ya existe' })

        let record = await Config.create(config);
        return response.json(record);
    }

    /**
     * Display a single config.
     * GET configs/:id
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */
    async show({ params, request, response, view }) {
        let config = await Config.findBy('id', params.id);
        return response.json(config);
    }

    /**
     * Render a form to update an existing config.
     * GET configs/:id/edit
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */
    async edit({ params, request, response, view }) {
    }

    /**
     * Update config details.
     * PUT or PATCH configs/:id
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async update({ params, request, response }) {
        let updated = await Config.query().where('id', params.id).update(request.all());
        return response.json({ updated: updated });
    }

    /**
     * Delete a config with id.
     * DELETE configs/:id
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async destroy({ params, request, response }) {
        let deleted = await Config.query().where('id', params.id).delete();
        return response.json({ deleted: deleted });
    }
}

module.exports = ConfigController
