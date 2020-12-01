const express = require('express');
const serveStatic = require('serve-static');

const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });

app = express();

app.use(serveStatic(__dirname + "/dist"));

var port = process.env.PORT || 8080;
var hostname = '127.0.0.1';

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
