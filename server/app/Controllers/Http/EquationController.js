'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Equation = use('App/Models/Equation');
const { validate } = use('Validator');

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
        try {
            let params = request.all();
            let equations = await Equation.query().with('site').paginate(params.page, params.perPage);
            return response.json(equations);
        } catch (error) {
            return response.unauthorized({ error: error.message });
        }
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
        try {
            const rules = {
                dateToFind: 'required',
                site_id: 'required'
            };

            const validation = await validate(request.post(), rules);

            if (validation.fails()) {
                let messages = validation.messages()[0];
                return response.unauthorized({ error: `El campo: ${messages.field} es obligatorio` });
            }

            let equation = request.post();
            let count = await Equation.query().where({ dateToFind: equation.dateToFind, site_id: equation.site_id }).getCount();

            if (count > 0)
                return response.conflict({ error: 'La ecuación con su consulta y sitio ya existe' });

            let record = await Equation.create(equation);
            return response.json(record);
        } catch (error) {
            return response.unauthorized({ error: error.message });
        }
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
        try {
            let equation = await Equation.findWithPopulate({ id: params.id });
            return response.json(equation);
        } catch (error) {
            return response.unauthorized({ error: error.message });
        }
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
        try {
            let updated = await Equation.query().where('id', params.id).update(request.all());
            let equation = await Equation.findBy('id', params.id);
            return response.json(equation);
        } catch (error) {
            return response.unauthorized({ error: error.message });
        }
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
