const Util = use('Util');
const WordCloudSite = use('App/Models/WordCloudSite');
const Logger = use('Logger');

class WordCloudSiteBuilder {

    constructor() { }

    async create(normalizedArticle) {
        try {
            let words = Util.countWords(normalizedArticle.wordcloud);

            for (const word of words) {
                try {
                    let wordRecord = await WordCloudSite.query().where({ word: word.text, site: normalizedArticle.article.displayLink }).first();

                    // if exists, update word frecuency in database, else create a new word
                    if (wordRecord && wordRecord !== null && wordRecord !== undefined) {
                        let value = (isNaN(word.value)) ? 0 : word.value;
                        wordRecord.frecuency = wordRecord.frecuency + value;
                        await wordRecord.save();
                    } else {
                        let value = (isNaN(word.value)) ? 0 : word.value;
                        await WordCloudSite.create({ word: word.text, frecuency: value, normalized_article_id: normalizedArticle.id, site: normalizedArticle.article.displayLink });
                    }
                } catch (error) {
                    throw error;
                }
            }

            Logger.info(`[WordCloudSiteBuilder] ${Date().toLocaleString()} - el articlo ${normalizedArticle.id} se agrego a la nube de palabras por sitio`);

            return true;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new WordCloudSiteBuilder();
