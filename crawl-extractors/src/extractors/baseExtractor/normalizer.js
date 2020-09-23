const logger = require('../../services/logger.service');

/**
 * Normalize extracted results
 * @param  {Array} records
 * @return normalized articles
 */
async function normalize(params, records) {
    try {
        let articles = [];

        for (const article of records.items) {
            let data = article;
            data.published = data.published.replace("|", "").trim();
            data.expected_date = params.equation.q;
            articles.push(data);
        }

        records.items = articles;
        await logger.success('crawl extractors', 'normalize', `ecuacion: ${params.equation.id} q: ${params.equation.q} indice: ${params.equation.start} cant. despues de normalizar: ${articles.length}`);
        return records;
    } catch(error) {
        await logger.error('crawl extractors', 'normalize', error.message, error.stack);
        throw new Error(error);
    }
}

module.exports.normalize = normalize;
