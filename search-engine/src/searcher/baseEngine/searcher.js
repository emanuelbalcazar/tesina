const axios = require('axios');
const logger = require('../../services/logger.service');

/**
 * Execute the search.
 * @param {Object} params
 * @param {String} query
 * @returns search results.
 */
async function search(params, query) {
    try {
        let response = await axios.get(query);
        response.data.items = (response.data.items) ? response.data.items : [];
        await logger.success('search engine', 'search', `status: ${response.statusText} - resultados obtenidos ${response.data.items.length}`, params.equation.id, params.equation.q, params.equation.start);

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
