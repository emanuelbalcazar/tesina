const logger = require('../../services/logger.service');

/**
 * Normalize search results
 * @param  {Array} records
 * @return normalized articles
 */
async function normalize(records, originalParams) {

    try {
        let results = originalParams;

        results.nextPage = {
            totalResults: records.queries.nextPage[0].totalResults,
            startIndex: records.queries.nextPage[0].startIndex
        };

        results.items = [];
        results.items = records.items.map(item => {
            return {
                title: item.title,
                link: item.link,
                snippet: item.snippet || '',
                metatags: item.pagemap.metatags
            }
        });

        logger.success('search engine', 'normalizer', 'OK');
        return results;
    } catch (error) {
        logger.error('search engine', 'normalizer', error.message, error.stack);
        throw new Error(error);
    }
}

module.exports.normalize = normalize;
