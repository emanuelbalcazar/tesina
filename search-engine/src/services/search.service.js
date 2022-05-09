const factory = require('../searcher/index');

/**
 * @class SearchService
 * @author Emanuel Balcazar
 */
class SearchService {

    constructor() { }

    /**
     * @param  {Object} params
     * @param  {String} [searchName='google']
     * @return search results
     */
    async search(params, searchName = 'google') {
        let google = factory.getSearcher(searchName);
        let query = await google.getQuery(params);
        let searchResults = await google.search(params, query);
        let filtered = await google.filter(params, searchResults, {});
        let results = await google.normalize(params, filtered);

        return results;
    }
}

module.exports = new SearchService();
