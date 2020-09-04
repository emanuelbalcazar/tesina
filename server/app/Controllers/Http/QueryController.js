'use strict'

const Query = use('App/Models/Query');

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with queries
 */
class QueryController {
    /**
     * Show a list of all queries.
     * GET queries
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */
    async index({ request, response, view }) {
        let params = request.all();
        let queries = await Query.query().paginate(params.page, params.perPage);

        if (params.page == "all")
            return await Query.all();

        return response.json(queries);
    }

    /**
     * Render a form to be used for creating a new query.
     * GET queries/create
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */
    async create({ request, response, view }) {
    }

    /**
     * Create/save a new query.
     * POST queries
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async store({ request, response }) {
        let query = request.post();
        let count = await Query.query().where({ q: query.q }).getCount();

        if (count > 0)
            return response.conflict({ code: 409, message: 'La consultá de búsqueda ya existe' })

        let record = await Query.create(query);
        return response.json(record);
    }

    /**
     * Display a single query.
     * GET queries/:id
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */
    async show({ params, request, response, view }) {
        let query = await Query.query().where('id', params.id).first();
        return response.json(query);
    }

    /**
     * Render a form to update an existing query.
     * GET queries/:id/edit
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */
    async edit({ params, request, response, view }) {
    }

    /**
     * Update query details.
     * PUT or PATCH queries/:id
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async update({ params, request, response }) {
        let updated = await Query.query().where('id', params.id).update(request.all());
        return response.json({ updated: updated });
    }

    /**
     * Delete a query with id.
     * DELETE queries/:id
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async destroy({ params, request, response }) {
        let deleted = await Query.query().where('id', params.id).delete();
        return deleted;
    }
}

module.exports = QueryController
