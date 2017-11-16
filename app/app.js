const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');

const app = express();
app.use(helmet());
app.use(bodyParser.json());
app.use(express.static(`${__dirname}/vues`));

app.set('views', `${__dirname}/vues`);
app.set('view engine', 'pug');

module.exports = app;
