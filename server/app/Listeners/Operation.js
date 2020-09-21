'use strict'
const Operation = exports = module.exports = {}

/**
 * Handle a new operation
 * Operation like a { type: 'operationType', data: 'operationData' }
 * @param {Object} operation
 */
Operation.new = async (operation) => {
    try {
        let command = require(`./Operations/${operation.type}`);
        let result = await command.execute(operation);
        return result;
    } catch (error) {
        throw error;
    }
}
