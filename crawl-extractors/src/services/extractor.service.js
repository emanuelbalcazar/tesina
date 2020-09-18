const factory = require('../extractors/index');

/**
 * @class ExtractorService
 * @author Emanuel Balcazar
 */
class ExtractorService {

    constructor() { }

    /**
     * @param  {Object} params
     * @param  {String} [name='default']
     * @return extraction results
     */
    async extract(params, name = 'default') {
        try {
            let extractor = factory.getExtractor(name);
            let htmls = await extractor.crawl(params);
            let articles = await extractor.scraping(params, htmls);
            let results = await extractor.normalize(params, articles);
            return results;
        } catch (error) {
            throw new Error(error);
        }
    }
}

module.exports = new ExtractorService();
