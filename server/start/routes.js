'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
    return { name: 'server', version: '2020-11', status: 'active' };
});

// routes without jwt
Route.group(() => {

    Route.post('/auth/login', 'AuthController.login');
    Route.post('/auth/register', 'AuthController.register');

}).prefix('api');

// routes with jwt
Route.group(() => {
    Route.resource('/articles', 'ArticleController');
    Route.resource('/configs', 'ConfigController');
    Route.resource('/equations', 'EquationController');
    Route.resource('/logs', 'LogController');
    Route.resource('/selectors', 'SelectorController');
    Route.resource('/sites', 'SiteController');
    Route.resource('/users', 'UserController');

    Route.post('/articles/findByExpectedDate', 'ArticleController.findByExpectedDate');
    Route.get('/extractions/execute/:id', 'ExtractionController.execute');

    Route.get('/wordcloud/date', 'WordCloudController.getByDate');
    Route.get('/wordcloud/site', 'WordCloudController.getBySite');

}).prefix('api')//.middleware(['auth:jwt']);
