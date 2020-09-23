const axios = require("axios");
const logger = require('../../services/logger.service');

/**
 * You can overwrite the implementation.
 * @param {String} params
 * @returns search results.
 */
async function crawl(params) {
    try {
        let allHtml = [];

        for (const item of params.items) {
            let newItem = item;
            let response = await axios.get(item.link);
            newItem.html = response.data;
            allHtml.push(newItem);
        }

        await logger.success('crawl extractors', 'crawl', `ecuacion: ${params.equation.id} q: ${params.equation.q} indice: ${params.equation.start} cant. de articulos: ${allHtml.length}`);
        params.items = allHtml;
        return params;
    } catch (error) {
        await logger.error('crawl extractors', 'crawl', error.message, error.stack);
        throw new Error(error);
    }
}

module.exports.crawl = crawl;
