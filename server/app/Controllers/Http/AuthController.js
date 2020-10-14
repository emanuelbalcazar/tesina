'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const User = use('App/Models/User');

/**
 * Controller for user authentication
 */
class AuthController {

    async login({ request, auth, response }) {
        const email = request.input("email");
        const password = request.input("password");

        try {
            if (await auth.attempt(email, password)) {
                let user = await User.findBy('email', email);
                let accessToken = await auth.generate(user);
                return response.json({ user: user, token: accessToken.token });
            }
        }
        catch (error) {
            return response.unauthorized({ code: 401, message: 'Usuario o contraseña invalidos.' });
        }
    }
}

module.exports = AuthController
