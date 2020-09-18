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
    async crawl(equation) {
        return await this.crawler.crawl(equation);
    }

    async scraping(equation, records) {
        return await this.scraper.scraping(equation, records);
    }

    async normalize(equation, records) {
        return await this.normalizer.normalize(equation, records);
    }
}

module.exports = BaseExtractor;
