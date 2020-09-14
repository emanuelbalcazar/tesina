'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Equation = use('App/Models/Equation');
const Config = use('App/Models/Config');
const Util = use('Util');
const RabbitMQ = use('RabbitMQ');

class ExtractionController {

    async execute({ params, request, auth, response }) {
        let equation = await Equation.findWithPopulate({ id: params.id });

        let requestLimit = await Config.query().where('key', 'requestLimit').first();
        let workers = await Config.query().where('key', 'workers').first();

        // calculate request limit per worker
        let limit = Number(requestLimit.value) / Number(workers.value);
        limit = Math.floor(limit);

        let extractionConfig = Util.normalizeEquation(equation[0]);
        extractionConfig.requestLimit = limit;

        await RabbitMQ.sendToEquationsExchange(extractionConfig, extractionConfig.equation.siteSearch);
        return extractionConfig;
    }
}

module.exports = ExtractionController
