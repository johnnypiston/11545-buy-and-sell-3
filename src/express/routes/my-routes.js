'use strict';

const {Router} = require(`express`);
const myRouter = new Router();

myRouter.get(`/`, (request, response) => response.send(`my-tickets`));
myRouter.get(`/comments`, (request, response) => response.send(`comments`));

module.exports = myRouter;
