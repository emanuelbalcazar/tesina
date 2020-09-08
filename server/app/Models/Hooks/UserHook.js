'use strict'

const Hash = use('Hash');
const UserHook = exports = module.exports = {}

UserHook.hashPassword = async (userInstance) => {
    userInstance.password = await Hash.make(userInstance.password);
}
