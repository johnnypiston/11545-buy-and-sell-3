'use strict';

const {Router} = require(`express`);
const offersRouter = new Router();

offersRouter.param(`id`, (request, response, next, id) => {
  request.id = id;
  next();
});

offersRouter.get(`/add`, (request, response) => response.send(`/offers/add`));
offersRouter.get(`/:id`, (request, response) => response.send(`/offers/${request.id}`));
offersRouter.get(`/edit/:id`, (request, response) => response.send(`/offers/edit/${request.id}`));
offersRouter.get(`/category/:id`, (request, response) => response.send(`/offers/category/${request.id}`));

module.exports = offersRouter;
