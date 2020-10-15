'use strict'

/*
|--------------------------------------------------------------------------
| UserSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const User = use('App/Models/User');
const users = require('./staging/users.json');

class UserSeeder {

    async run() {
        for (const user of users) {
            await User.findOrCreate({ email: user.email }, user);
        }

        console.log('Se cargaron los usuarios correctamente.');
    }
}

module.exports = UserSeeder
