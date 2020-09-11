const parse = require('node-html-parser');
const logger = require('../../services/logger.service');

/**
 * You can overwrite the implementation.
 * @param {Object} params
 * @returns
 */
async function scraping(params, selectors) {
    try {
        let articles = [];

        for (const data of params.items) {
            const root = parse.parse(data.html);
            let article = data;
            delete article.html; // I delete the attribute because it is no longer necessary.
            article.body = '';

            for (const selector of selectors) {
                let elements = root.querySelectorAll(selector.selector);

                if (selector.section == 'titulo') {
                    article.title = elements[0].text || elements[0].innerText;
                }

                if (selector.section == 'bajada') {
                    article.snippet = elements[0].text || elements[0].innerText;
                }

                if (selector.section == 'cuerpo') {
                    let text = elements.map(elem => {
                        return elem.text || elem.innerText;
                    });

                    article.body += text.join('\n').trim();
                }

                if (selector.section == 'fecha') {
                    article.published = elements[0].text || elements[0].innerText;
                }
            }

            if (article.body.length > 0)
                articles.push(article);
        }

        await logger.success('crawl extractors', 'scrapping', `cant. de articulos: ${articles.length}`);
        params.items = articles;
        return params;
    } catch (error) {
        await logger.error('crawl extractors', 'scrapping', error.message, error.stack);
        throw new Error(error);
    }
}

module.exports.scraping = scraping;
