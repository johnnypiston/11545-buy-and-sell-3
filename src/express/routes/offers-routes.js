'use strict';

const {Router} = require(`express`);
const offersRouter = new Router();

offersRouter.get(`/add`, (req, res) => res.send(`tickets/new-ticket`));
offersRouter.get(`/:id`, (req, res) => res.send(`tickets/ticket`));
offersRouter.get(`/edit/:id`, (req, res) => res.send(`tickets/ticket-edit`));
offersRouter.get(`/category/:id`, (req, res) => res.send(`category`));

module.exports = offersRouter;
