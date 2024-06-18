const express = require('express');
const cors = require('cors');
const userRoutes = require('routes/userRoutes');
const authRoutes = require('routes/authRoutes');
require('dotenv').config();

const app = express();

//Routing
app.use(cors());
app.use(express.json());
app.use('/api', userRoutes);
app.use('/api', authRoutes);

module.exports = app;

