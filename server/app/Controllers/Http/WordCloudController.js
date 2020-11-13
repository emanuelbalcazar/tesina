'use strict'

const WordCloudService = use('WordCloudService');

class WordCloudController {

    async getByDate({ request, response }) {
        try {
            let params = request.get();

            if (!params.date) {
                return response.badRequest('Debe proporcionar una fecha valida');
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
                return response.badRequest('Debe proporcionar un sitio');
            }

            let wordcloud = await WordCloudService.getBySite(params.site, params.minPercentage);

            return response.json(wordcloud);
        } catch (error) {
            return response.unauthorized({ error: error });
        }
    }
}

module.exports = WordCloudController
