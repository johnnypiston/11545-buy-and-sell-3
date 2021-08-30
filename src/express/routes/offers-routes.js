'use strict';

const {Router} = require(`express`);
const offersRouter = new Router();

offersRouter.get(`/add`, (req, res) => res.render(`tickets/new-ticket`));
offersRouter.get(`/:id`, (req, res) => res.render(`tickets/ticket`));
offersRouter.get(`/edit/:id`, (req, res) => res.render(`tickets/ticket-edit`));
offersRouter.get(`/category/:id`, (req, res) => res.render(`category`));

module.exports = offersRouter;
