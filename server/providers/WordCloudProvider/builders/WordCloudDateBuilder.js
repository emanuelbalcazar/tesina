const Util = use('Util');
const WordCloudDate = use('App/Models/WordCloudDate');
const Logger = use('Logger');

/**
 * @class WordCloudDateBuilder
 * @author Emanuel Balcazar
 */
class WordCloudDateBuilder {

    constructor() { }

    /**
     * Create wordcloud from single normalized article
     * @param  {Object} normalizedArticle
     * @return {Boolean} true if finish
     */
    async create(normalizedArticle) {
        try {

            let words = Util.countWords(normalizedArticle.wordcloud);

            for (const word of words) {
                try {
                    let wordRecord = await WordCloudDate.query().where({ word: word.text, date: normalizedArticle.article.expected_date }).first();

                    // if exists, update word frecuency in database, else create a new word
                    if (wordRecord && wordRecord !== null && wordRecord !== undefined) {
                        let value = (isNaN(word.value)) ? 0 : word.value;
                        wordRecord.frecuency = wordRecord.frecuency + value;
                        await wordRecord.save();
                    } else {
                        let value = (isNaN(word.value)) ? 0 : word.value;
                        await WordCloudDate.create({ word: word.text, frecuency: value, normalized_article_id: normalizedArticle.id, date: normalizedArticle.article.expected_date });
                    }
                } catch (error) {
                    throw error;
                }
            }

            Logger.info(`[WordCloudDateBuilder] ${Date().toLocaleString()} - el articlo ${normalizedArticle.id} se agrego a la nube de palabras por fecha`);

            return true;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new WordCloudDateBuilder();
