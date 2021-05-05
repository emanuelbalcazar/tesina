const logger = require('../../services/logger.service');

/**
 * Normalize extracted results
 * @param  {Object} params
 * @param  {Object} records
 * @return normalized articles
 */
async function normalize(params, records) {
    try {
        let articles = [];

        for (const article of records.items) {
            let data = article;
            data.published = data.published.replace('|', '').trim();
            data.expected_date = params.equation.q;
            articles.push(data);
        }

        records.items = articles;
        await logger.success('crawl extractors', 'normalize', `despues de normalizar: ${articles.length}`, params.equation.id, params.equation.q, params.equation.start);
        return records;
    } catch (error) {
        await logger.error('crawl extractors', 'normalize', error.message, error.stack);
        throw error;
    }
}

module.exports.normalize = normalize;
