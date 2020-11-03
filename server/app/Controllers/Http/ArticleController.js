'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Article = use('App/Models/Article');

/**
 * Resourceful controller for interacting with articles
 */
class ArticleController {
    /**
     * Show a list of all articles.
     * GET articles
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */
    async index({ request, response, view }) {
        try {
            let params = request.all();
            let articles = await Article.searchByCriteria(params.criteria, params.page, params.perPage);
            return response.json(articles);
        } catch (error) {
            return response.unauthorized({ error: error.message });
        }
    }

    /**
     * Render a form to be used for creating a new article.
     * GET articles/create
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */
    async create({ request, response, view }) {
    }

    /**
     * Create/save a new article.
     * POST articles
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async store({ request, response }) {
    }

    /**
     * Display a single article.
     * GET articles/:id
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */
    async show({ params, request, response, view }) {
        try {
            let article = await Article.findBy('id', params.id);
            return response.json(article);
        } catch (error) {
            return response.unauthorized({ error: error.message });
        }
    }

    /**
     * Render a form to update an existing article.
     * GET articles/:id/edit
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */
    async edit({ params, request, response, view }) {
    }

    /**
     * Update article details.
     * PUT or PATCH articles/:id
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async update({ params, request, response }) {
    }

    /**
     * Delete a article with id.
     * DELETE articles/:id
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async destroy({ params, request, response }) {
    }

    async findByExpectedDate({ request, response }) {
        try {
            let params = request.all();

            if (!params.date)
                return response.badRequest({ error: 'Debe proporcionar una fecha valida' });

            let articles = await Article.findByExpectedDate(params.date);
            return response.json(articles);
        } catch (error) {
            return response.unauthorized({ error: error.message });
        }
    }
}

module.exports = ArticleController
