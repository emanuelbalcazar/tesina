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
        logger.success('search engine', 'search', response.statusText);
        response.data.items = (response.data.items) ? response.data.items : [];
        return response.data;
    } catch (error) {
        logger.error('search engine', 'getQuery', error.message, error.stack);
        throw new Error(error);
    }
}

module.exports.search = search;
