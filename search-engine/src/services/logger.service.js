const rabbitmq = require('../rabbitmq/rabbitmq');
const chalk = require('chalk');
const config = require('../config/config');

/**
 * @class Logger
 * @author Emanuel Balcazar
 */
class Logger {

    constructor() { }

    /**
     * @param  {String} level
     * @param  {String} component
     * @param  {String} operation
     * @param  {String} message
     * @return {void}
     * @memberof Logger
     */
    log(level, component, operation, message) {
        createLog(level, component, operation, message);
    }

    /**
     *
     * @param  {String} component
     * @param  {String} operation
     * @param  {String} message
     * @return {void}
     * @memberof Logger
     */
    info(component, operation, message) {
        createLog('info', component, operation, message);
    }

    /**
     * @param  {String} component
     * @param  {String} operation
     * @param  {String} message
     * @return {void}
     * @memberof Logger
     */
    debug(component, operation, message) {
        createLog('debug', component, operation, message);
    }

    success(component, operation, message) {
        createLog('success', component, operation, message);
    }

    /**
     * @param  {String} component
     * @param  {String} operation
     * @param  {String} message
     * @param  {String} stack
     * @return {void}
     * @memberof Logger
     */
    error(component, operation, message, stack) {
        createLog('error', component, operation, message, stack);
    }
}

async function createLog(level, component, operation, message, stack) {

    let log = {
        level: level || 'info',
        component: component || 'no identificado',
        operation: operation || 'no identificada',
        message: message || '',
        stack: stack || '',
        date: new Date().toLocaleString()
    };

    if (config.PRINT_LOGS_ON_CONSOLE)
        printOnConsole(log);

    await rabbitmq.sendToQueue(config.LOGS_QUEUE_NAME, log);
}

/**
 * Print the log in the console.
 * @param {Object} log
 */
function printOnConsole(log) {
    let chalk = getChalk(log.level);
    console.log(chalk(`[${log.component}]: ${log.date} - ${log.level} - ${log.operation}: ${log.message}`));
}

/**
 * Configure the chalk module and return the corresponding instance associated with the level.
 * @param {String} level
 * @returns {Chalk} object.
 */
function getChalk(level) {
    switch (level) {
        case 'info': return chalk.blue;
        case 'warn': return chalk.yellow;
        case 'error': return chalk.red;
        case 'debug': return chalk.cyan;
        case 'success': return chalk.green;
        default: return chalk.white;
    }
}

module.exports = new Logger();
