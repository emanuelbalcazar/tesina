const axios = require('axios');
const logger = require('../../services/logger.service');

/**
 * Execute the search.
 * You can overwrite the implementation.
 * @param {String} query
 * @returns search results.
 */
async function search(params, query) {
    try {
        let response = await axios.get(query);
        response.data.items = (response.data.items) ? response.data.items : [];
        await logger.success('search engine', 'search', `ecuacion: ${params.equation.id} q: ${params.equation.q} indice: ${params.equation.start} status: ${response.statusText} - resultados obtenidos ${response.data.items.length}`);

        return response.data;
    } catch (error) {
        if (error.response && error.response.data) {
            throw error.response.data.error;
        }

        logger.error('search engine', 'search', error.message, error.stack);
        throw error;
    }
}

module.exports.search = search;
