class SearcherStrategy {

    constructor() {
        this.searcher = {}
    }

    setStrategy(aSearcher) {
        this.searcher = aSearcher;
    }

    async execute(equation = {}) {
        try {
            let query = this.searcher.getQuery(equation);
            let searchResults = await this.searcher.search(query);
            let filtered = this.searcher.filter(searchResults, equation.filters);
            return filtered;
        } catch (error) {
            throw new Error(error);
        }
    }
}

module.exports = new SearcherStrategy();
