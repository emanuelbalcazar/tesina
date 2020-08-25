const querystring = require('querystring');
const axios = require('axios');
const config = require('../../config/config');

/**
 * Build the search query corresponding to the search engine.
 * You can overwrite the implementation.
 * @param {Object} params request parameters.
 * @returns query ready to execute.
 */
async function getQuery(params) {
    try {
        let baseURL = config.GOOGLE_API + querystring.stringify(params);
        let response = await axios.get(baseURL);
        return response.data;
    } catch (error) {
        throw new Error(error);
    }
}

module.exports.getQuery = getQuery;
