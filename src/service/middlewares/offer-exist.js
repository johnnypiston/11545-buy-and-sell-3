'use strict';

const {HttpResponseCode} = require(`../../constants`);

module.exports = (service) => (req, res, next) => {
  const {offerId} = req.params;
  const offer = service.findOne(offerId);

  if (!offer) {
    return res.status(HttpResponseCode.NOT_FOUND).send(`Offer with ${offerId} not found`);
  }

  res.locals.offer = offer;
  return next();
};
