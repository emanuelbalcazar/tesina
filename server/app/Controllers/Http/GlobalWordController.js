'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const GlobalWordService = use('GlobalWordService');


/**
 * Resourceful controller for interacting with globalwords
 */
class GlobalWordController {
    /**
     * Show a list of all globalwords.
     * GET globalwords
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */
    async index({ request, response, view }) {
        try {
            let params = request.all();
            let words = await GlobalWordService.searchByCriteria(params.criteria, params.page, params.perPage);
            return response.json(words);
        } catch (error) {
            return response.unauthorized({ error: error.message });
        }
    }

    async count({ request, response, view }) {
        try {
            let count = await GlobalWordService.count();
            return response.json({ total: count});
        } catch (error) {
            return response.unauthorized({ error: error.message });
        }
    }

    async getMostFrecuentWords({ request, response, view }) {
        try {
            let params = request.all();
            let words = await GlobalWordService.getMostFrecuentWords(params.limit);
            return words;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Render a form to be used for creating a new globalword.
     * GET globalwords/create
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */
    async create({ request, response, view }) {
    }

    /**
     * Create/save a new globalword.
     * POST globalwords
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async store({ request, response }) {
    }

    /**
     * Display a single globalword.
     * GET globalwords/:id
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */
    async show({ params, request, response, view }) {
    }

    /**
     * Render a form to update an existing globalword.
     * GET globalwords/:id/edit
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */
    async edit({ params, request, response, view }) {
    }

    /**
     * Update globalword details.
     * PUT or PATCH globalwords/:id
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async update({ params, request, response }) {
    }

    /**
     * Delete a globalword with id.
     * DELETE globalwords/:id
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async destroy({ params, request, response }) {
    }
}

module.exports = GlobalWordController
