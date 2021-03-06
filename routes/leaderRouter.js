const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var authenticate = require('../authenticate');

const Leader = require('../models/leaders');
const leaderRouter = express.Router();


leaderRouter.use(bodyParser.json());


leaderRouter.route('/')

.get((req,res,next) => {
  Leader.find({})
  .then((leaders) => {
      res.statusCode = 200;
      res.setHeader('Content-Typ*e', 'application/json');
      res.json(leaders);
  }, (err) => next(err))
  .catch((err) => next(err));
})
.post(authenticate.verifyUser, (req,res,next) => {
  Leader.create(req.body)
  .then((leader) => {
      console.log('Promotion Created ', leader);
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(leader);
  }, (err) => next(err))
  .catch((err) => next(err));
 })

.put(authenticate.verifyUser, (req,res,next) => {
   res.statusCode = 403;
   res.end('put operation not supported on /leaders');
 })

.delete(authenticate.verifyUser, (req,res,next) => {
  Leader.remove({})
.then((resp) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(resp);
}, (err) => next(err))
.catch((err) => next(err)); 
});

leaderRouter.route('/:leaderId')

.get((req,res,next) => {
  Leader.findById(req.params.leaderId)
  .then((leader) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(leader);
  }, (err) => next(err))
  .catch((err) => next(err)); 
})

.post(authenticate.verifyUser, (req, res, next) => {
res.statusCode = 403;
res.end('POST operation not supported on /leaders/'+ req.params.leaderId);
})

.put(authenticate.verifyUser, (req, res, next) => {
  Leader.findByIdAndUpdate(req.params.leaderId, {
    $set: req.body
}, { new: true })
.then((leader) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(leader);
}, (err) => next(err))
.catch((err) => next(err)); 
})

.delete(authenticate.verifyUser, (req, res, next) => {
  Leader.findByIdAndRemove(req.params.leaderId)
    .then((resp) => { 
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});

module.exports = leaderRouter;