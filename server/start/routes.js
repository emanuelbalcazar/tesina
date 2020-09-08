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
    return { greeting: 'Hello world in JSON' }
});

// routes with prefix 'api'
Route.group(() => {

    Route.post('/auth/login', 'AuthController.login');

    Route.resource('/articles', 'ArticleController');
    Route.resource('/equations', 'EquationController');
    Route.resource('/logs', 'LogController');
    Route.resource('/queries', 'QueryController');
    Route.resource('/selectors', 'SelectorController');
    Route.resource('/sites', 'SiteController');
    Route.resource('/users', 'UserController');

}).prefix('api');
