/**
 * Default implementation of a crawl extractor, works as base class.
 * @class BaseExtractor
 * @author Emanuel Balcazar
 */
class BaseExtractor {

    constructor(params = {}) {
        this.crawler = params.crawler || require('./crawler');
        this.scraper = params.scraping || require('./scraper');
        this.normalizer = params.normalizer || require('./normalizer');
    }

    // defaults implementations...
    async crawl(params) {
        return await this.crawler.crawl(params);
    }

    async scraping(params, selectors) {
        return await this.scraper.scraping(params, selectors);
    }

    async normalize(params) {
        return await this.normalizer.normalize(params);
    }
}

module.exports = BaseExtractor;
