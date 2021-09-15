'use strict';

const {Router} = require(`express`);
const {HttpResponseCode} = require(`../../constants`);

const route = new Router();

module.exports = (service) => {
  route.get(`/`, (req, res) => {
    const categories = service.findAll();
    res.status(HttpResponseCode.OK).json(categories);
  });

  return route;
};
