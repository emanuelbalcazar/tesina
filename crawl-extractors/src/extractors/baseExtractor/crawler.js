const axios = require('axios');
const logger = require('../../services/logger.service');

/**
 * @param {Object} params
 * @returns search results.
 */
async function crawl(params) {
    try {
        let allHtml = [];

        for (const item of params.items) {
            try {
                let newItem = item;
                let response = await axios.get(item.link);
                newItem.html = response.data;
                allHtml.push(newItem);
            } catch (error) {
                await logger.error('crawl extractors', 'crawl', `articulo: ${item.link} error: ${error.message}`, error.stack);
            }
        }

        await logger.success('crawl extractors', 'crawl', `cantidad de articulos: ${allHtml.length}`, params.equation.id, params.equation.q, params.equation.start);
        params.items = allHtml;
        return params;
    } catch (error) {
        await logger.error('crawl extractors', 'crawl', error.message, error.stack);
        throw error;
    }
}

module.exports.crawl = crawl;
