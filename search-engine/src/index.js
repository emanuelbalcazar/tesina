/**
 * Configure and start the application.
 * @author Emanuel Balcazar
 */
const express = require('express');
const compression = require('compression');
const helmet = require('helmet');
const logger = require('morgan');
const chalk = require('chalk');
const workerManagement =  require('./workers/index');

// load .env configuration
require('dotenv').config()
const config = require('./config/config');

const success = chalk.green;
const error = chalk.red;

// create our app with express.
const app = express();

// configure all environments.
app.use(logger('dev'));
app.use(compression());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// import all routes.
const router = require('./routes/routes');
app.use('/api', router);

// catch all errors.
app.use(function (err, req, res, next) {
    console.log(error(err.stack));
    res.status(500).json({ code: 500, message: err.message });
});

// catch unhandled rejection from promises.
process.on('unhandledRejection', function (err) {
    console.log(error(err.stack));
});

// set host and port.
app.set('host', config.HOST);
app.set('port', config.PORT);

// listening application.
app.listen(app.get('port'), async () => {
    console.log(success(`[Search Engine] - started in ${app.get('host')}:${app.get('port')}`));
    await workerManagement.startAllWorkers();
});
