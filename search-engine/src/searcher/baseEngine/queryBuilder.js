const querystring = require('querystring');
const config = require('../../config/config');

const logger = require('../../services/logger.service');

/**
 * Build the search query corresponding to the search engine.
 * You can overwrite the implementation.
 * @param {Object} params request parameters.
 * @returns query ready to execute.
 */
async function getQuery(params) {
    try {
        let baseURL = config.GOOGLE_API + querystring.stringify(params);
        logger.success('search engine', 'getQuery', 'OK');
        return baseURL;
    } catch (error) {
        logger.error('search engine', 'getQuery', error.message, error.stack);
        throw new Error(error);
    }
}

module.exports.getQuery = getQuery;
