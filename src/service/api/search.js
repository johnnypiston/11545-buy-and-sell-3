'use strict';

const {Router} = require(`express`);
const {HttpResponseCode} = require(`../../constants`);

const route = new Router();

module.exports = (searchService) => {
  route.get(`/`, (req, res) => {
    const offers = searchService.searchOffers();
    res.status(HttpResponseCode.OK).json(offers);
  });

  return route;
};
