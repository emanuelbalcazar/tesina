'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const NormalizedArticle = use('App/Models/NormalizedArticle');
const Article = use('App/Models/Article');

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

    async getWordCloud({ request, response }) {
        try {
            let params = request.all();

            if (!params.date) {
                return response.badRequest('Debe proporcionar una fecha valida');
            }

            // get params
            let date = params.date;
            let minPercentage = params.minPercentage || 30;

            // find articles by expected date
            let articles = await Article.findByExpectedDate(date);
            articles = articles.toJSON();

            if (articles.length == 0) {
                return response.forbidden('No se encontraron articulos');
            }

            let ids = articles.map(article => { return article.id });

            // get normalized articles with previous ids
            let normalized = await NormalizedArticle.query().whereIn('article_id', ids).fetch();
            normalized = normalized.toJSON();

            if (normalized.length == 0) {
                return response.forbidden('No se encontraron articulos procesados para crear la nube');
            }

            // get all text
            let text = normalized.map(article => {
                return article.wordcloud
            });

            text = text.join(" "); // join text on single string

            // count words frecuency
            let words = text.split(" ").reduce((hash, word) => {
                hash[word] = hash[word] || 0;
                hash[word]++;
                return hash;
            }, {});

            let result = [];

            // create array of objects for wordcloud
            for (const key in words) {
                if (words.hasOwnProperty(key) && key.length > 1) {
                    result.push({ text: key, value: words[key] });
                }
            }

            // sort by desc
            result = result.sort(function (a, b) {
                return b.value - a.value;
            });

            let maxValue = result[0].value;
            let percentage = (minPercentage * maxValue / 100);

            // filter by minimum percentage
            result = result.filter(w => {
                return (w.value >= percentage);
            });

            return result;
        } catch (error) {
            return response.forbidden(error);
        }
    }
}

module.exports = NormalizedArticleController
