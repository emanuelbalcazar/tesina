'use strict'

const WordCloudService = use('WordCloudService');

class WordCloudController {

    async getByDate({ request, response }) {
        try {
            let params = request.get();

            if (!params.date) {
                return response.badRequest({ error: 'Debe proporcionar una fecha valida' });
            }

            let wordcloud = await WordCloudService.getByDate(params.date, params.minPercentage);

            return response.json(wordcloud);
        } catch (error) {
            return response.unauthorized({ error: error });
        }
    }

    async getBySite({ request, response }) {
        try {
            let params = request.get();

            if (!params.site) {
                return response.badRequest({ error: 'Debe proporcionar un sitio web' });
            }

            let wordcloud = await WordCloudService.getBySite(params.site, params.minPercentage);

            return response.json(wordcloud);
        } catch (error) {
            return response.unauthorized({ error: error });
        }
    }

    async getWordCount({ request, response }) {
        try {
            let count = await WordCloudService.getWordCount();
            return response.json({ total: count });
        } catch (error) {
            return response.unauthorized({ error: error });
        }
    }

    async getMostFrecuentWords({ request, response }) {
        try {
            let params = request.get();
            let words = await WordCloudService.getMostFrecuentWords(params.limit);
            return response.json(words);
        } catch (error) {
            return response.unauthorized({ error: error });
        }
    }

    async getSites({ request, response }) {
        try {
            let sites = await WordCloudService.getSites();
            return response.json(sites);
        } catch (error) {
            return response.unauthorized({ error: error });
        }
    }
}

module.exports = WordCloudController
