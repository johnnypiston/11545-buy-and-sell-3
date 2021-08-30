'use strict';

const {Router} = require(`express`);
const mainRouter = require(`./main-routes`);
const myRouter = require(`./my-routes`);
const offersRouter = require(`./offers-routes`);

const appRouter = new Router();

appRouter.use(`/`, mainRouter);
appRouter.use(`/my`, myRouter);
appRouter.use(`/offers`, offersRouter);

module.exports = appRouter;
