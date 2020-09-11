const logger = require('../../services/logger.service');

/**
 * Normalize extracted results
 * @param  {Array} records
 * @return normalized articles
 */
async function normalize(records, originalParams) {
    try {
        let articles = [];

        for (const article of records.items) {
            let data = article;
            data.published = data.published.replace("|", "").trim();
            data.expected_date = originalParams.equation.q;
            articles.push(data);
        }

        records.items = articles;
        logger.success('crawl extractors', 'normalize', articles.length);
        return records;
    } catch (error) {
        logger.error('crawl extractors', 'normalize', error.message, error.stack);
        throw new Error(error);
    }
}

module.exports.normalize = normalize;
