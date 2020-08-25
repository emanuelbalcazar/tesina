/**
 * @class SearcherFactory
 */
class SearcherFactory {

    constructor() { }

    /**
     * @param  {String} searcherName
     * @return searcher or error
     */
    getSearcher(searcherName) {
        try {
            let searcher = require(`./${searcherName.toLowerCase()}`);
            return searcher;
        } catch (error) {
            throw new Error(`No se encontro un buscador con el nombre: ${searcherName}`);
        }
    }
}

module.exports = new SearcherFactory();
