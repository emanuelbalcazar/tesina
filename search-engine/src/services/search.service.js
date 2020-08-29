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
        try {
            let google = factory.getSearcher(searchName);
            let query = await google.getQuery(params.equation);
            let searchResults = await google.search(query);
            let filtered = await google.filter(searchResults, {});
            let results = await google.normalize(filtered, params);

            return results;
        } catch (error) {
            throw new Error(error);
        }
    }
}

module.exports = new SearchService();
