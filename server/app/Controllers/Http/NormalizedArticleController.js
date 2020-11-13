'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const NormalizedArticle = use('App/Models/NormalizedArticle');

/**
 * Resourceful controller for interacting with normalizedarticles
 */
class NormalizedArticleController {
    /**
     * Show a list of all normalizedarticles.
     * GET normalizedarticles
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */
    async index({ request, response, view }) {
    }

    /**
     * Render a form to be used for creating a new normalizedarticle.
     * GET normalizedarticles/create
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */
    async create({ request, response, view }) {
    }

    /**
     * Create/save a new normalizedarticle.
     * POST normalizedarticles
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async store({ request, response }) {
    }

    /**
     * Display a single normalizedarticle.
     * GET normalizedarticles/:id
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */
    async show({ params, request, response, view }) {
    }

    /**
     * Render a form to update an existing normalizedarticle.
     * GET normalizedarticles/:id/edit
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */
    async edit({ params, request, response, view }) {
    }

    /**
     * Update normalizedarticle details.
     * PUT or PATCH normalizedarticles/:id
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async update({ params, request, response }) {
    }

    /**
     * Delete a normalizedarticle with id.
     * DELETE normalizedarticles/:id
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async destroy({ params, request, response }) {
    }

    async getCount({ request, response }) {
        try {
            let count = await NormalizedArticle.getCount();
            return response.json({ total: count });
        } catch (error) {
            return response.unauthorized({ error: error.message });
        }
    }
}

module.exports = NormalizedArticleController
