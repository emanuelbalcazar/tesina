const GlobalWord = use('App/Models/GlobalWord');

/**
 * @class GlobalWordService
 * @author Emanuel Balcazar
 */
class GlobalWordService {

    /**
     * Creates an instance of GlobalWordService.
     * @memberof GlobalWordService
     */
    constructor() {

    }

    /**
     * Search a global word by criteria
     * @param {String} criteria 
     * @param {Number} page 
     * @param {Number} perPage 
     * @returns global words
     */
    async searchByCriteria(criteria = '', page = 1, perPage = 10) {
        try {
            let words = await GlobalWord.searchByCriteria(criteria, page, perPage);
            return words;
        } catch (error) {
            throw error;
        }
    }

    /**
     * 
     * @returns number of global words
     */
    async count() {
        try {
            let count = await GlobalWord.getCount();
            return count;
        } catch (error) {
            throw error;
        }
    }

    /**
     * @param {Number} limit 
     * @returns get most frequent words
     */
    async getMostFrecuentWords(limit = 10) {
        try {
            let words = await GlobalWord.query().orderBy('total', 'desc').paginate(1, limit);
            return words;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = GlobalWordService;
