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

    async findByArticleIds({ request, response }) {
        let params = request.all();

        if (!params.ids || params.ids.length == 0) {
            return response.badRequest('Debe proporcionar un arreglo de al menos un id');
        }

        let articles = NormalizedArticle.query().whereIn('article_id', params.ids).fetch();
        return articles;
    }

    async getWordCloud({ request, response }) {
        let params = request.all();
        let articles = await NormalizedArticle.query().whereIn('article_id', params.ids).fetch();

        // get all text
        let text = articles.toJSON().map(article => {
            return article.body
        });

        text = text.join(" "); // join text on single string

        // count words frecuency
        let words = text.split(" ").reduce((hash, word) => {
            hash[word] = hash[word] || 0;
            hash[word]++;
            return hash;
        }, {});

        let result = [];

        for (const key in words) {
            if (words.hasOwnProperty(key) && words[key] > 5) {
                result.push({ text: key, value: words[key] })
            }
        }

        return result;
    }
}

module.exports = NormalizedArticleController
