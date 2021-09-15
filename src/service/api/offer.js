'use strict';

const {Router} = require(`express`);
const {HttpResponseCode} = require(`../../constants`);

const route = new Router();

module.exports = (offerService) => {
  route.get(`/:offerId`, (req, res) => {
    const {offerId} = req.params;
    const offer = offerService.findOne(offerId);

    if (!offer) {
      return res.status(HttpResponseCode.NOT_FOUND)
        .send(`Not found with ${offerId}`);
    }

    return res.status(HttpResponseCode.OK)
      .json(offer);
  });

  return route;
};
