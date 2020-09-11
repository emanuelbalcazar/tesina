const axios = require('axios');
const logger = require('../../services/logger.service');

/**
 * Execute the search.
 * You can overwrite the implementation.
 * @param {String} query
 * @returns search results.
 */
async function search(query) {
    try {
        let response = await axios.get(query);
        response.data.items = (response.data.items) ? response.data.items : [];
        await logger.success('search engine', 'search', `${response.statusText} - resultados obtenidos ${response.data.items.length}`);

        return response.data;
    } catch (error) {
        logger.error('search engine', 'search', error.message, error.stack);
        throw new Error(error);
    }
}

module.exports.search = search;
