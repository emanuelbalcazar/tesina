/**
 * @class ExtractorFactory
 * @author Emanuel Balcazar
 */
class ExtractorFactory {

    constructor() { }

    /**
     * @param  {string} [name='default']
     * @return a extractor instance
     * @memberof ExtractorFactory
     */
    getExtractor(name = 'default') {
        try {
            let extractorName = name.toLowerCase();
            let extractor = require(`./${extractorName}/${extractorName}`);

            return extractor;
        } catch (error) {
            throw new Error(`No se encontro un extractor con el nombre: ${extractorName}`);
        }
    }
}

module.exports = new ExtractorFactory();
