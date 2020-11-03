'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Selector = use('App/Models/Selector');
const { validate } = use('Validator');

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
        try {
            let params = request.all();
            let selectors = await Selector.searchByCriteria(params.criteria, params.page, params.perPage);
            return response.json(selectors);
        } catch (error) {
            return response.unauthorized({ error: error.message });
        }
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
        try {
            const rules = {
                selector: 'required'
            };

            const validation = await validate(request.post(), rules);

            if (validation.fails()) {
                let messages = validation.messages()[0];
                return response.unauthorized({ error: `El campo: ${messages.field} es obligatorio` });
            }

            let selector = request.post();
            let count = await Selector.query().where({ selector: selector.selector, section: selector.section }).getCount();

            if (count > 0)
                return response.conflict({ error: 'El selector ya existe' })

            let record = await Selector.create(selector);
            return response.json(record);
        } catch (error) {
            return response.unauthorized({ error: error.message });
        }
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
        try {
            let selector = await Selector.findBy('id', params.id);
            return response.json(selector);
        } catch (error) {
            return response.unauthorized({ error: error.message });
        }
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
        try {
            let updated = await Selector.query().where('id', params.id).update(request.all());
            let selector = await Selector.findBy('id', params.id);
            return response.json(selector);
        } catch (error) {
            return response.unauthorized({ error: error.message });
        }
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
        try {
            let deleted = await Selector.query().where('id', params.id).delete();
            return response.json({ deleted: deleted });
        } catch (error) {
            return response.unauthorized({ error: error.message });
        }
    }
}

module.exports = SelectorController
