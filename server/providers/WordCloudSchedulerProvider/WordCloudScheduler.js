const Logger = use('Logger');
const nodeScheduler = require('node-schedule');
const WordCloudService = use('WordCloudService');
const NormalizedArticle = use('App/Models/NormalizedArticle');

/**
 * @class WordCloudScheduler
 * @author Emanuel Balcazar
 */
class WordCloudScheduler {

    /**
     * Creates an instance of WordCloudScheduler.
     * @memberof WordCloudScheduler
     */
    constructor() {
        this.job = {}
        this.scheduleEvery = '';
        this.limit = 0;
    }

    setScheduleEvery(every) {
        this.scheduleEvery = every;
    }

    setLimit(limit = 10) {
        this.limit = Number(limit);
    }

    getScheduleEvery() {
        return this.scheduleEvery;
    }
    
    async start() {
        this.job = nodeScheduler.scheduleJob(this.scheduleEvery, async (fireDate) => {
            Logger.info(`[${this.scheduleEvery}] - ejecutando constructor de nube de palabras ${fireDate}`);

            let normalizedArticles = await NormalizedArticle.query().where('in_wordcloud', false).whereNotNull('wordcloud').with('article').paginate(1, this.limit);
            normalizedArticles = normalizedArticles.toJSON();
            await WordCloudService.create(normalizedArticles.data);
        });
    }
}

module.exports = WordCloudScheduler;
