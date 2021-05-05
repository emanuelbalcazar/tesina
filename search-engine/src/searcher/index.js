/**
 * @class SearchFactory
 * @author Emanuel Balcazar
 */
class SearchFactory {

    constructor() { }

    /**
     * @param  {string} [name='google']
     * @return a searcher instance
     * @memberof SearchFactory
     */
    getSearcher(name = 'google') {
        try {
            var searchName = name.toLowerCase();
            let searcher = require(`./${searchName}/${searchName}`);
            return searcher;
        } catch (error) {
            throw new Error(`No se encontro un buscador con el nombre: ${searchName}`);
        }
    }
}

module.exports = new SearchFactory();
