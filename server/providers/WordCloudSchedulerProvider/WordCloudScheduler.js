const Logger = use('Logger');
const nodeScheduler = require('node-schedule');
const WordCloudService = use('WordCloudService');
const NormalizedArticle = use('App/Models/NormalizedArticle');

// TODO optimizar
const MAX_ARTICLE_LIMIT = 60;

class WordCloudScheduler {

    constructor() {
        this.job = {}
        this.scheduleEvery = '';
    }

    setScheduleEvery(every) {
        this.scheduleEvery = every;
    }

    getScheduleEvery() {
        return this.scheduleEvery;
    }

    async start() {
        this.job = nodeScheduler.scheduleJob(this.scheduleEvery, async (fireDate) => {
            Logger.info(`[${this.scheduleEvery}] - ejecutando constructor de nube de palabras ${fireDate}`);

            let normalizedArticles = await NormalizedArticle.query().where('in_wordcloud', false).with('article').paginate(1, MAX_ARTICLE_LIMIT);
            normalizedArticles = normalizedArticles.toJSON();
            await WordCloudService.create(normalizedArticles.data);
        });
    }
}

module.exports = WordCloudScheduler;
