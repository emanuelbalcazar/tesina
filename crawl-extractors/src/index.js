/**
 * Configure and start the application.
 * @author Emanuel Balcazar
 */
const express = require('express');
const compression = require('compression');
const helmet = require('helmet');
const logger = require('morgan');
const chalk = require('chalk');
const workerManagement = require('./workers/index');

// load .env configuration
require('dotenv').config();
const config = require('./config/config');

const success = chalk.green;
const error = chalk.red;
const info = chalk.cyan;

// create our app with express.
const app = express();

// configure all environments.
app.use(logger('dev'));
app.use(compression());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// add swagger
const swaggerUI = require('swagger-ui-express');
const swaggerDocument = require('./swagger/swagger-crawl-extractors.json');
swaggerDocument.host = config.HOST + ':' + config.PORT;
app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

// import all routes.
const router = require('./routes/routes');
app.use('/api', router);

// catch all errors.

app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send({ code: 500, message: err.message });
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
    console.log(success(`[Crawl Extractors] - started in http://${app.get('host')}:${app.get('port')}`));
    console.log(info(`Swagger available in http://${app.get('host')}:${app.get('port')}/docs`));

    if (config.CONNECT_TO_RABBIT)
        await workerManagement.startAllWorkers();
});
