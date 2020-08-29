/**
 * Default implementation of a search engine, works as base class.
 * @class BaseEngine
 * @author Emanuel Balcazar
 */
class BaseEngine {

    constructor(params = {}) {
        this.queryBuilder = params.queryBuilder || require('./queryBuilder');
        this.searcher = params.searcher || require('./searcher');
        this.filtering = params.filtering || require('./filtering');
        this.normalizer = params.normalizer || require('./normalizer');
    }

    // defaults implementations...
    async getQuery(params) {
        return this.queryBuilder.getQuery(params);
    }

    async search(query) {
        return await this.searcher.search(query);
    }

    async filter(searchResults, criteria = {}) {
        return this.filtering.filter(searchResults, criteria);
    }

    async normalize(filteredResults, equation) {
        return this.normalizer.normalize(filteredResults, equation);
    }
}

module.exports = BaseEngine;
