const WordCloud = use('App/Models/WordCloud');
const NormalizedArticle = use('App/Models/NormalizedArticle');
const Logger = use('Logger');
const WordCloudBuilder = require('./builders/WordCloudBuilder');
const Database = use('Database');
const GlobalWord = use('App/Models/GlobalWord');

/**
 * @class WordCloudService
 * @author Emanuel Balcazar
 */
class WordCloudService {

    /**
     * Creates an instance of WordCloudService.
     * @memberof WordCloudService
     */
    constructor() { }

    /**
     * Create wordcloud from normalized articles
     * @param  {Array} [normalizedArticles=[]]
     * @return {void}
     */
    async create(normalizedArticles = []) {
        try {

            for (const article of normalizedArticles) {
                try {
                    await WordCloudBuilder.create(article);
                    await NormalizedArticle.setArticleInWordCloud(article.id, true);
                } catch (error) {
                    Logger.error(`[WordCloudService] ${Date().toLocaleString()} - error al crear nube del articulo ${article.id}, ${error}`);
                }
            }

            Logger.info(`[WordCloudService] ${Date().toLocaleString()} - terminado lote de ${normalizedArticles.length} articulos normalizados`);

            return true;
        } catch (error) {
            throw error;
        }
    };

    /**
     * Get wordcloud by date
     * @param  {Date} date
     * @param  {number} [minPercentage=0]
     */
    async getByDateRange(from, to, minPercentage = 0) {
        try {
            let wordcloud = await WordCloud.query().whereBetween('date', [from, to]).orderBy('frecuency', 'desc').fetch();
            wordcloud = wordcloud.toJSON();

            if (wordcloud.length == 0) {
                throw `No se encontraron nubes de palabras con la fecha desde ${from} a ${to}`;
            }

            let maxValue = wordcloud[0].frecuency;
            let percentage = (minPercentage * maxValue / 100);

            // filter by minimum percentage
            let result = wordcloud.filter(w => {
                return (w.frecuency >= percentage);
            });

            result = result.map(word => {
                return { text: word.word, value: word.frecuency, date: word.date };
            });

            return result;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Get wordcloud by site
     * @param  {Site} site
     * @param  {number} [minPercentage=0]
     */
    async getBySite(site, minPercentage = 0) {
        try {
            let wordcloud = await WordCloud.query().where('site', 'ilike', `%${site}%`).orderBy('frecuency', 'desc').fetch();
            wordcloud = wordcloud.toJSON();

            if (wordcloud.length == 0) {
                throw 'No se encontro una nube de palabras con el sitio ' + site;
            }

            let maxValue = wordcloud[0].frecuency;
            let percentage = (minPercentage * maxValue / 100);

            // filter by minimum percentage
            let result = wordcloud.filter(w => {
                return (w.frecuency >= percentage);
            });

            result = result.map(word => {
                return { text: word.word, value: word.frecuency, site: word.site };
            });

            return result;
        } catch (error) {
            throw error;
        }
    }

    /**
     * @return number of words
     */
    async getWordCount() {
        try {
            let count = await GlobalWord.getCount();
            return count;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Get most frecuent words with limit
     * @TODO acumular valores de las palabras
     * @param  {Number} limit
     */
    async getMostFrecuentWords(limit) {
        try {
            let words = await GlobalWord.query().orderBy('total', 'desc').paginate(1, limit);
            return words;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Get all available sites
     */
    async getSites() {
        try {
            let sites = await Database.raw('SELECT DISTINCT(site) as site FROM public.word_clouds')
            sites = sites.rows.map(site => { return site.site });
            return sites;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = WordCloudService;