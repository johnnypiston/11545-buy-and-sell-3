'use strict';

const {Router} = require(`express`);
const {HttpResponseCode} = require(`../../constants`);

const route = new Router();

module.exports = (searchService) => {
  route.get(`/`, (req, res) => {
    const {query: searchText = ``} = req.query;

    if (!searchText) {
      res.status(HttpResponseCode.BAD_REQUEST).json([]);
      return;
    }

    const searchResults = searchService.searchOffers(searchText);

    res.status(HttpResponseCode.OK).json(searchResults);
  });

  return route;
};
