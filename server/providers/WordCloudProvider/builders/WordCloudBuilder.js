const Util = use('Util');
const WordCloud = use('App/Models/WordCloud');
const GlobalWord = use('App/Models/GlobalWord');

/**
 * @class WordCloudDateBuilder
 * @author Emanuel Balcazar
 */
class WordCloudBuilder {

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
                    let wordRecord = await WordCloud.query().where({ word: word.text, date: normalizedArticle.article.expected_date, site: normalizedArticle.article.displayLink }).first();

                    // if exists, update word frecuency in database, else create a new word
                    if (wordRecord && wordRecord !== null && wordRecord !== undefined) {
                        let value = (isNaN(word.value)) ? 0 : word.value;
                        wordRecord.frecuency = wordRecord.frecuency + value;
                        await wordRecord.save();
                    } else {
                        let value = (isNaN(word.value)) ? 0 : word.value;
                        await WordCloud.create({ word: word.text, frecuency: value, normalized_article_id: normalizedArticle.id, date: normalizedArticle.article.expected_date, site: normalizedArticle.article.displayLink });
                    }

                    // add word and frecuency in global table
                    await GlobalWord.create(word.text, word.value);

                } catch (error) {
                    throw error;
                }
            }

            return true;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new WordCloudBuilder();
