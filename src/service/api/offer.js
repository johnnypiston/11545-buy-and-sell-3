'use strict';

const {Router} = require(`express`);
const {HttpResponseCode} = require(`../../constants`);
const offerValidator = require(`../middlewares/offer-validator`);
const offerExist = require(`../middlewares/offer-exist`);

const route = new Router();

module.exports = (offerService, commentService) => {
  route.get(`/`, (req, res) => {
    return res.status(HttpResponseCode.OK).json(offerService.findAll());
  });

  route.get(`/:offerId`, (req, res) => {
    const {offerId} = req.params;
    const offer = offerService.findOne(offerId);

    if (!offer) {
      return res.status(HttpResponseCode.NOT_FOUND).send(`Not found with ${offerId}`);
    }

    return res.status(HttpResponseCode.OK).json(offer);
  });

  route.post(`/`, offerValidator, (req, res) => {
    const offer = offerService.create(req.body);

    return res.status(HttpResponseCode.CREATED).json(offer);
  });

  route.put(`/:offerId`, (req, res) => {
    const {offerId} = req.params;
    const offer = offerService.findOne(offerId);

    if (!offer) {
      return res.status(HttpResponseCode.NOT_FOUND).send(`Not found with ${offerId}`);
    }

    const updateOffer = offerService.update(offer, req.body);

    return res.status(HttpResponseCode.OK).json(updateOffer);
  });

  route.delete(`/:offerId`, (req, res) => {
    const {offerId} = req.params;
    const offer = offerService.drop(offerId);

    if (!offer) {
      return res.status(HttpResponseCode.NOT_FOUND).send(`Not found with ${offerId}`);
    }

    return res.status(HttpResponseCode.OK).json(offer);
  });

  route.get(`/:offerId/comments`, offerExist(offerService), (req, res) => {
    const {offer} = res.locals;

    const comments = commentService.findAll(offer);

    res.status(HttpResponseCode.OK).json(comments);
  });

  route.delete(`/:offerId/comments/:commentId`, offerExist(offerService), (req, res) => {
    const {offer} = res.locals;
    const {commentId} = req.params;

    const deletedComment = commentService.drop(offer, commentId);

    if (!deletedComment) {
      return res.status(HttpResponseCode.NOT_FOUND).send(`Not found`);
    }

    return res.status(HttpResponseCode.OK).json(deletedComment);
  });

  route.post(`/:offerId/comments`, offerExist(offerService), (req, res) => {
    const {offer} = res.locals;
    const newComment = commentService.create(offer, req.body);

    return res.status(HttpResponseCode.OK).json(newComment);
  });

  return route;
};
