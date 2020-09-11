'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Equation = use('App/Models/Equation');
const Util = use('Util');
const RabbitMQ = use('RabbitMQ');

class ExtractionController {

    async execute({ params, request, auth, response }) {
        let equationID = params.id;
        let equation = await Equation.findWithPopulate({ id: params.id });
        equation = Util.normalizeEquation(equation[0]);
        await RabbitMQ.sendToEquationsExchange(equation, equation.equation.siteSearch);

        return equation;
    }
}

module.exports = ExtractionController
