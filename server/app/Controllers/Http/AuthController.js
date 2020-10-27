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

    async register({ request, auth, response }) {

        const rules = {
            email: 'required|email',
            password: 'required'
        };

        const validation = await validate(request.all(), rules);

        if (validation.fails()) {
            return response.unauthorized(validation.messages())
        }

        let user = request.post();
        let count = await User.query().where({ email: user.email }).getCount();

        if (count > 0) {
            return response.unauthorized({ code: 401, message: 'El usuario ya se encuentra registrado' });
        }

        user = await User.create(user);
        let accessToken = await auth.generate(user);

        return response.json({ user: user, accessToken: accessToken.token });
    }
}

module.exports = AuthController
