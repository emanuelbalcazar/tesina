const config = require('../../config/config');
const logger = require('../../services/logger.service');

/**
 * Filter the information received using some evaluation criteria.
 * @param {Object} [criteria={}]
 * @param {Array} records
 * @returns filtered data
 */
async function filter(records, criteria) {

    try {
        let filtered = records.items.filter(article => {
            let hasExcludedWord = new RegExp(config.excludedWords.join("|"), "gi").test(article.link);
            return !hasExcludedWord;
        });

        records.items = filtered;
        logger.success('search engine', 'filter', filtered.length);

        return records;
    } catch (error) {
        logger.error('search engine', 'filter', error.message, error.stack);
        throw new Error(error);
    }
}

module.exports.filter = filter;
