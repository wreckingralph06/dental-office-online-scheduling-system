const express = require('express');
const cors = require('cors');
const userRoutes = require('routes/userRoutes');
const demoRoute = require('routes/demoRoute');
require('dotenv').config();

const app = express();

//Routing
app.use(cors());
app.use(express.json());
app.use('/api/example', demoRoute);
app.use('/api', userRoutes);

module.exports = app;

