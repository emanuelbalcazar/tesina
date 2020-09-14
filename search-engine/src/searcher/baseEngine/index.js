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

    async search(params, query) {
        return await this.searcher.search(params, query);
    }

    async filter(params, searchResults) {
        return this.filtering.filter(params, searchResults);
    }

    async normalize(params, filteredResults) {
        return this.normalizer.normalize(params, filteredResults);
    }
}

module.exports = BaseEngine;
