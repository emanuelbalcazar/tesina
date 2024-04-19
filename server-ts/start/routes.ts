/* eslint-disable @adonisjs/prefer-lazy-controller-import */
/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import SitesController from '#controllers/sites_controller'
import UsersController from '#controllers/users_controller'
import router from '@adonisjs/core/services/router'

router.get('/', async () => {
    return {
        name: 'server-ts',
        status: 'active',
    }
})

/* router group /api */
router
    .group(() => {
        router.resource('sites', SitesController)
        router.resource('users', UsersController)
    })
    .prefix('api')
