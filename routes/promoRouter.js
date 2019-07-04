const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const Promo = require('../models/promotions');
const promoRouter = express.Router();

promoRouter.use(bodyParser.json());


promoRouter.route('/')
 
.get((req,res,next) => {
  Promo.find({})
  .then((promotions) => {
      res.statusCode = 200;
      res.setHeader('Content-Typ*e', 'application/json');
      res.json(promotions);
  }, (err) => next(err))
  .catch((err) => next(err));
})
.post((req,res,next) => {
  Promo.create(req.body)
  .then((promotion) => {
      console.log('Promotion Created ', promotion);
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(promotion);
  }, (err) => next(err))
  .catch((err) => next(err));
 })

.put((req,res,next) => {
   res.statusCode = 403;
   res.end('put operation not supported on /promotions');
 })

.delete((req,res,next) => {
Promo.remove({})
.then((resp) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(resp);
}, (err) => next(err))
.catch((err) => next(err)); 
});

promoRouter.route('/:promoId')

.get((req,res,next) => {
  Promo.findById(req.params.promoId)
  .then((promotion) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(promotion);
  }, (err) => next(err))
  .catch((err) => next(err)); 
})

.post((req, res, next) => {
res.statusCode = 403;
res.end('POST operation not supported on /promotions/'+ req.params.promoId);
})

.put((req, res, next) => {
  Promo.findByIdAndUpdate(req.params.promoId, {
    $set: req.body
}, { new: true })
.then((promotion) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(promotion);
}, (err) => next(err))
.catch((err) => next(err)); 
})

.delete((req, res, next) => {
  Promo.findByIdAndRemove(req.params.promoId)
    .then((resp) => { 
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});


module.exports = promoRouter;