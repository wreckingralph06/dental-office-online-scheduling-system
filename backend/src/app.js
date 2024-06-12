const express = require('express');

const app = express();

//Routing
const demoRoute = require('./routes/demoRoute');
app.use('/api/example', demoRoute);

module.exports = app;

