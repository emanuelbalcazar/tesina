const config = require('../../config/config');
const logger = require('../../services/logger.service');

/**
 * Filter the information received using some evaluation criteria.
 * @param {Object} [criteria={}]
 * @param {Array} records
 * @returns filtered data
 */
async function filter(params, records) {

    try {
        let filtered = records.items.filter(article => {
            let hasExcludedWord = new RegExp(config.excludedWords.join("|"), "gi").test(article.link);
            return !hasExcludedWord;
        });

        records.items = filtered;
        await logger.success('search engine', 'filter', `cantidad despues de filtrar: ${filtered.length}`, params.equation.id, params.equation.q, params.equation.start);

        return records;
    } catch (error) {
        logger.error('search engine', 'filter', error.message, error.stack);
        throw error;
    }
}

module.exports.filter = filter;
