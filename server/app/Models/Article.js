'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');
const Database = use('Database');

class Article extends Model {

    static boot() {
        super.boot();
        this.addTrait('NoTimestamp');
    }

    static async findByExpectedDate(date) {
        let articles = await Article.query().select('id').where('expected_date', date).fetch();
        return articles;
    }

    static async searchByCriteria(criteria = '', page, perPage) {
        if (!page || page == undefined || page == null)
            return await this.query().where('title', 'ilike', `%${criteria}%`).orWhere('link', 'ilike', `%${criteria}%`).orWhere('body', 'ilike', `%${criteria}%`).orWhere('published', 'ilike', `%${criteria}%`).orderBy('id', 'asc').fetch();

        return await this.query().where('title', 'ilike', `%${criteria}%`).orWhere('link', 'ilike', `%${criteria}%`).orWhere('body', 'ilike', `%${criteria}%`).orWhere('published', 'ilike', `%${criteria}%`).orderBy('id', 'asc').paginate(page, perPage);
    }

    static async exportToCsv(params) {
        let result = {};
        let limit = params.limit || 100000;

        if (params.sites && params.sites !== undefined && params.sites.length > 0) {
            result = await this.query().whereBetween('expected_date', [params.from, params.to]).whereIn('displayLink', params.sites).orderBy('id', 'asc').paginate(1, limit);
            return result;
        }

        result = await this.query().whereBetween('expected_date', [params.from, params.to]).orderBy('id', 'asc').paginate(1, limit);

        return result;
    }

    static async sitesAvailables() {
        let sites = await Database.raw('SELECT DISTINCT("displayLink") as site FROM public.articles');
        sites = sites.rows.map(site => { return site.site });
        return sites;
    }
}

module.exports = Article
