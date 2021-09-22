'use strict';

const {Router} = require(`express`);
const chalk = require(`chalk`);
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
  let data = [];

  try {
    data = await getMockData();
  } catch (error) {
    console.error(chalk.red(`Ошибка получения мокирующих данных.`));
  }

  apiRouter.use(`/offers`, getOfferRouter(new OfferService(data), new CommentService()));
  apiRouter.use(`/categories`, getCategoryRouter(new CategoryService(data)));
  apiRouter.use(`/search`, getSearchRouter(new SearchService(data)));

  return apiRouter;
};

module.exports = createRouter;
