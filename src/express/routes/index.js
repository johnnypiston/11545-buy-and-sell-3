'use strict';

const express = require(`express`);
const mainRouter = require(`./main-routes`);
const myRouter = require(`./my-routes`);
const offersRouter = require(`./offers-routes`);

const app = express();

app.use(`/`, mainRouter);
app.use(`/my`, myRouter);
app.use(`/offers`, offersRouter);

module.exports = app;
