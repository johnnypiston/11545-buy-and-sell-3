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

const createRouter = async () => {
  const apiRouter = new Router();
  const data = await getMockData();

  apiRouter.use(`/offers`, getOfferRouter(new OfferService(data), new CommentService()));
  apiRouter.use(`/categories`, getCategoryRouter(new CategoryService(data)));
  apiRouter.use(`/search`, getSearchRouter(new SearchService(data)));

  return apiRouter;
};

module.exports = createRouter;
