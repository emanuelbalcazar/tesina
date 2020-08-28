const axios = require("axios");

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

        params.items = allHtml;
        return params;
    } catch (error) {
        throw new Error(error);
    }
}

module.exports.crawl = crawl;
