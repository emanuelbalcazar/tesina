const axios = require('axios');

/**
 * Execute the search.
 * You can overwrite the implementation.
 * @param {String} query
 * @returns search results.
 */
async function search(query) {
    try {
        let response = await axios.get(query);
        return response.data;
    } catch (error) {
        throw new Error(error);
    }
}

module.exports.search = search;
