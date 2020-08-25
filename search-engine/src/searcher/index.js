class SearchFactory {

    constructor() { }

    getSearcher(name = 'google') {
        try {
            let searcher = require(`./${name.toLowerCase()}`);
            return searcher;
        } catch (error) {
            throw new Error(`No se encontro un buscador con el nombre: ${name}`);
        }
    }
}

module.exports = new SearchFactory();
