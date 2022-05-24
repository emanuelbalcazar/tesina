'use strict'

const WordCloudService = use('WordCloudService');

class WordCloudController {

    async getByDateRange({ request, response }) {
        try {
            let params = request.get();

            if (!params.from || !params.to) {
                return response.badRequest({ error: 'Debe proporcionar una fecha valida' });
            }

            let wordcloud = await WordCloudService.getByDateRange(params.from, params.to, params.minPercentage);

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

    async getSites({ request, response }) {
        try {
            let sites = await WordCloudService.getSites();
            return response.json(sites);
        } catch (error) {
            return response.unauthorized({ error: error });
        }
    }

    async getWordBySite({ request, response }) {
        try {
            let params = request.all();
            let words = await WordCloudService.getWordBySite(params.word, params.site);
            return response.json(words);
        } catch (error) {
            return response.unauthorized({ error: error.message });
        }
    }
}

module.exports = WordCloudController
