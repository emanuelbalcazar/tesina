const logger = require('../../services/logger.service');

/**
 * Normalize search results
 * @param {Object} params
 * @param {Object} records
 * @return normalized articles
 */
async function normalize(params, records) {

    try {
        let results = params;

        results.nextPage = { totalResults: 0, startIndex: 1 };

        results.nextPage.totalResults = (records.searchInformation) ? Number(records.searchInformation.totalResults) : 0;
        results.nextPage.startIndex = (records.queries.nextPage) ? records.queries.nextPage[0].startIndex : -1;

        results.items = [];
        results.items = records.items.map(item => {
            return {
                title: item.title,
                link: item.link,
                displayLink: item.displayLink
            }
        });

        await logger.success('search engine', 'normalizer', `total: ${results.nextPage.totalResults} - cant. despues de normalizar: ${results.items.length}`, params.equation.id, params.equation.q, params.equation.start);

        return results;
    } catch (error) {
        logger.error('search engine', 'normalizer', error.message, error.stack);
        throw error;
    }
}

module.exports.normalize = normalize;
