const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const urlRoutes = require('./routes/urlroutes');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
const path = require('path');
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', urlRoutes);

module.exports = app;
