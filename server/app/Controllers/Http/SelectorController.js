'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Selector = use('App/Models/Selector');

/**
 * Resourceful controller for interacting with selectors
 */
class SelectorController {
    /**
     * Show a list of all selectors.
     * GET selectors
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */
    async index({ request, response, view }) {
        let params = request.all();
        params.columnName = params.columnName || 'selector';
        params.columnValue = params.columnValue || '';

        if (params.page == "all")
            return await Selector.all();

        let selectors = await Selector.query().where(params.columnName, 'ILIKE', `%${params.columnValue}%`).paginate(params.page, params.perPage);
        return response.json(selectors);
    }

    /**
     * Render a form to be used for creating a new selector.
     * GET selectors/create
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */
    async create({ request, response, view }) {
    }

    /**
     * Create/save a new selector.
     * POST selectors
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async store({ request, response }) {
        let selector = request.post();
        let count = await Selector.query().where({ selector: selector.selector }).getCount();

        if (count > 0)
            return response.conflict({ code: 409, message: 'El selector ya existe' })

        let record = await Selector.create(selector);
        return response.json(record);
    }

    /**
     * Display a single selector.
     * GET selectors/:id
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */
    async show({ params, request, response, view }) {
        let selector = await Selector.query().where('id', params.id).first();
        return response.json(selector);
    }

    /**
     * Render a form to update an existing selector.
     * GET selectors/:id/edit
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */
    async edit({ params, request, response, view }) {
    }

    /**
     * Update selector details.
     * PUT or PATCH selectors/:id
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async update({ params, request, response }) {
        let updated = await Selector.query().where('id', params.id).update(request.all());
        return response.json({ updated: updated });
    }

    /**
     * Delete a selector with id.
     * DELETE selectors/:id
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async destroy({ params, request, response }) {
        let selectors = await Selector.query().where('id', params.id).delete();
        return selectors;
    }
}

module.exports = SelectorController
