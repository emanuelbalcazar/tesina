'use strict'
const Logger = use('Logger');
const Operation = exports = module.exports = {}

/**
 * Handle a new operation
 * Operation like a { type: 'operationType', data: 'operationData' }
 * @param {Object} operation
 */
Operation.new = async (operation) => {
    try {
        Logger.info('[server] - Operación entrante: ' + JSON.stringify(operation));
        let command = require(`./Operations/${operation.type}`);
        let result = await command.execute(operation);
        Logger.info('[server] - Operación terminada: ' + result);
        return result;
    } catch (error) {
        Logger.error('[server] - error al ejecutar la operación: ' + error);
        throw error;
    }
}
