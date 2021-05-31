'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');
const Database = use('Database');
const moment = require('moment');

const months = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre']

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

    /**
     * @returns Articles group by month like {month: <month>, total: <total>, label: <label>}
     */
    static async perMonth() {
        let databaseResult = await Database.raw('SELECT "published" as date, COUNT(*) as total FROM public.articles GROUP BY articles.published ORDER BY published desc');

        //console.log(moment('septiembre 9, 2020', 'MMMM DD, YYYY').locale('es').format('DD/MM/YYYY'));
        //console.log( new RegExp(months.join("|")).test(String('01 Abril 2016').toLowerCase()) )

        // obtengo las fechas formateadas
        let articlesPerMonthData = databaseResult.rows.map(row => {
            try {
                if (row.date.includes('/') && row.date.split('/')[0].length == 2) {
                    row.month = moment(row.date, 'DD/MM/YYYY').locale('es').format('MM/YYYY');
                }
                else if (row.date.includes('/') && row.date.length > 10 && row.date.split('/')[0].length == 2) {
                    row.month = moment(row.date, 'DD/MM/YYYY HH:mm').locale('es').format('MM/YYYY');
                }
                else if (row.date.includes('/') && row.date.split('/')[0].length == 4) {
                    row.month = moment(row.date, 'YYYY/MM/DD').locale('es').format('MM/YYYY');
                } else if (row.date.includes('de') && new RegExp(months.join("|")).test(String(row.date).toLowerCase())) {
                    row.date = row.date.replace('de', '');
                    row.month = moment(row.date, 'DD MMMM YYYY').locale('es').format('MM/YYYY');
                } else if (row.date.includes(',')) {
                    row.month = moment(row.date, 'MMMM DD, YYYY').locale('es').format('MM/YYYY');
                }

                row.label = moment(row.month, 'MM/YYYY').locale('es').format('MMMM YYYY');

                return row;
            } catch (error) {
                throw error;
            }
        });

        /*
        
        let temporal = {};
 
         // accumulate similar months
         articlesPerMonthData.forEach(row => {
             temporal[row.month] = (temporal[row.month] === undefined) ? Number(row.total) : (Number(temporal[row.month]) + Number(row.total));
         });
 
         
         let result = [];
 
         // store temporal data into array objects
         Object.entries(temporal).forEach(([key, value]) => {
             result.push({ month: key, total: value });
         });
 
         // sort asc
         result = result.sort((a, b) => {
             let aa = a.month.split('/').reverse().join(),
                 bb = b.month.split('/').reverse().join();
             return aa < bb ? -1 : (aa > bb ? 1 : 0);
         }); */

        return articlesPerMonthData;
    }
}

module.exports = Article
