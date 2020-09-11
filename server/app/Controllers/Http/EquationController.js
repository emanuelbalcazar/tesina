'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Equation = use('App/Models/Equation');

/**
 * Resourceful controller for interacting with equations
 */
class EquationController {
    /**
     * Show a list of all equations.
     * GET equations
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */
    async index({ request, response, view }) {
        let params = request.all();
        let equations = await Equation.query().with('query').with('site').paginate(params.page, params.perPage);
        return response.json(equations);
    }

    /**
     * Render a form to be used for creating a new equation.
     * GET equations/create
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */
    async create({ request, response, view }) {
    }

    /**
     * Create/save a new equation.
     * POST equations
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async store({ request, response }) {
        let equation = request.post();
        let count = await Equation.query().where({ query_id: equation.query_id, site_id: equation.site_id }).getCount();

        if (count > 0)
            return response.conflict({ code: 409, message: 'La ecuación con su consulta y sitio ya existe' });

        let record = await Equation.create(equation);
        return response.json(record);
    }

    /**
     * Display a single equation.
     * GET equations/:id
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */
    async show({ params, request, response, view }) {
        let equation = await Equation.findWithPopulate({ id: params.id });
        return response.json(equation);
    }

    /**
     * Render a form to update an existing equation.
     * GET equations/:id/edit
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */
    async edit({ params, request, response, view }) {
    }

    /**
     * Update equation details.
     * PUT or PATCH equations/:id
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async update({ params, request, response }) {
        let updated = await Equation.query().where('id', params.id).update(request.all());
        return response.json({ updated: updated });
    }

    /**
     * Delete a equation with id.
     * DELETE equations/:id
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async destroy({ params, request, response }) {
    }
}

module.exports = EquationController
