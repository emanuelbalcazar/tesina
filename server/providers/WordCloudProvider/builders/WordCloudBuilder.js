const Util = use('Util');
const WordCloud = use('App/Models/WordCloud');
const GlobalWord = use('App/Models/GlobalWord');
const moment = require('moment');
moment.locale('es-es');

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
                    let expected_date = normalize(normalizedArticle.article.expected_date);

                    if (expected_date != null || expected_date != undefined) {
                        let wordRecord = await WordCloud.query().where({ word: word.text, date: expected_date, site: normalizedArticle.article.displayLink }).first();

                        // if exists, update word frecuency in database, else create a new word
                        if (wordRecord && wordRecord !== null && wordRecord !== undefined) {
                            let value = (isNaN(word.value)) ? 0 : word.value;
                            wordRecord.frecuency = wordRecord.frecuency + value;
                            await wordRecord.save();
                        } else {
                            let value = (isNaN(word.value)) ? 0 : word.value;
                            await WordCloud.create({ word: word.text, frecuency: value, normalized_article_id: normalizedArticle.id, date: expected_date, site: normalizedArticle.article.displayLink });
                        }

                        // add word and frecuency in global table
                        await GlobalWord.create(word.text, word.value);
                    }
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

function normalize(aDate) {
    try {
        if (aDate == null || aDate == undefined) {
            return null;
        }

        aDate = aDate.replace(/(")/g, "")

        if (!String(aDate).includes('/')) {
            aDate = moment(aDate, 'MMMM DD, YYYY').format("YYYY-MM-DD");
        } else {
            let slash = String(aDate).substr(0, String(aDate).indexOf('/'));

            if (slash.length < 3) {
                aDate = moment(aDate, 'DD/MM/YYYY').format('YYYY-MM-DD');
            } else {
                aDate = moment(aDate, 'YYYY/MM/DD').format('YYYY-MM-DD');
            }
        }

        aDate = normalizeDate(aDate);

        return aDate;
    } catch (error) {
        console.log(`[wordcloudBuilder] error al normalizar fecha: ${aDate} - ${error}`);
    }
}

function normalizeDate(aDate) {
    let aDateNormalized = moment(aDate).toDate();
    aDateNormalized = new Date(aDateNormalized.getTime() - (aDateNormalized.getTimezoneOffset() * 60000)).toJSON();
    return aDateNormalized;
}

module.exports = new WordCloudBuilder();
