'use strict';

const {Router} = require(`express`);
const getOfferRouter = require(`./offer`);
const getCategoryRouter = require(`./category`);
const getSearchRouter = require(`./search`);
const OfferService = require(`../data-service/offer`);
const CategoryService = require(`../data-service/category`);
const SearchService = require(`../data-service/search`);
const CommentService = require(`../data-service/comment`);
const {getMockData} = require(`../lib/get-mock-data`);

const apiRouter = new Router();

(async () => {
  const data = await getMockData();

  apiRouter.use(`/offers`, getOfferRouter(new OfferService(data), new CommentService()));
  apiRouter.use(`/category`, getCategoryRouter(new CategoryService(data)));
  apiRouter.use(`/search`, getSearchRouter(new SearchService(data)));
})();

module.exports = apiRouter;
