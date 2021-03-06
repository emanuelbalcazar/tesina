const parse = require('node-html-parser');
const logger = require('../../services/logger.service');

/**
 * @param {Object} params
 * @param {Object} params
 * @returns scrapped data
 */
async function scraping(params, records) {
    try {
        let articles = [];

        for (const data of records.items) {
            const root = parse.parse(data.html);
            let article = data;
            delete article.html; // I delete the attribute because it is no longer necessary.
            article.body = '';

            for (const selector of params.selectors) {
                try {
                    let elements = root.querySelectorAll(selector.selector);

                    if (selector.section == 'titulo') {
                        article.title = elements[0].text || elements[0].innerText || elements[0].childNodes[0].rawText;
                    }

                    if (selector.section == 'bajada') {
                        article.snippet = elements[0].text || elements[0].innerText || elements[0].childNodes[0].rawText || '';
                    }

                    if (selector.section == 'cuerpo') {
                        let text = elements.map(elem => {
                            return elem.text || elem.innerText || elem.childNodes[0].rawText;
                        });

                        article.body += text.join('\n').trim();
                    }

                    if (selector.section == 'fecha') {
                        article.published = elements[0].text || elements[0].innerText || elements[0].childNodes[0].rawText;
                    }
                } catch (error) {
                    await logger.error('crawl extractors', 'scrapping', `articulo: ${article.link} selector: ${selector.selector} error: ${error.message}`, error.stack);
                }
            }

            if (article.body.length > 0)
                articles.push(article);
        }

        await logger.success('crawl extractors', 'scrapping', `cantidad de articulos: ${articles.length}`, params.equation.id, params.equation.q, params.equation.start);
        records.items = articles;
        return records;
    } catch (error) {
        await logger.error('crawl extractors', 'scrapping', error.message, error.stack);
        throw error;
    }
}

module.exports.scraping = scraping;
