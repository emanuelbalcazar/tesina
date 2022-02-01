'use strict'
const Env = use('Env');

const host = Env.get('HOST', 'localhost');
const port = Env.get('PORT', '3333');

module.exports = {

    /*
    |--------------------------------------------------------------------------
    | Swagger Information
    | Please use Swagger 2 Spesification Docs
    | https://swagger.io/docs/specification/2-0/basic-structure/
    |--------------------------------------------------------------------------
    */

    enable: true,
    specUrl: '/swagger.json',
    options: {
        swaggerDefinition: {
            info: {
                title: 'Server API Doc',
                version: '1.0.0',
            },
            host: `${host}:${port}`,
            basePath: `/api`,
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                }
            },
            securityDefinitions: {
                bearerAuth: {
                    type: 'apiKey',
                    in: 'header',
                    name: 'Authorization'
                },
            }
        },

        // Path to the API docs
        // Sample usage
        // apis: [
        //    'docs/**/*.yml',    // load recursive all .yml file in docs directory
        //    'docs/**/*.js',     // load recursive all .js file in docs directory
        // ]
        apis: [
            'app/Docs/*.yml'
        ]
    }
}

