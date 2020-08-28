const parse = require('node-html-parser');

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
            let newItem = data;
            delete newItem.html; // I delete the attribute because it is no longer necessary.
            newItem.text = '';

            for (const selector of selectors) {
                let elements = root.querySelectorAll(selector);

                // if there are elements, I get the text.
                if (elements.length > 0) {
                    let text = elements.map(elem => {
                        return elem.text || elem.innerText;
                    });

                    newItem.text += text.join('\n').trim();
                }
            }

            if (newItem.text.length > 0)
                articles.push(newItem);
        }

        params.items = articles;

        return params;
    } catch (error) {
        throw new Error(error);
    }
}

module.exports.scraping = scraping;
