var Hero = require('../models/Hero');

exports.index = function(req, res, next) {
  Hero
    .query()
    .eager('race')
    .then(function(heroes){
      res.json(heroes);
    }, next);
};

exports.show = function(req, res, next) {
  Hero
    .query()
    .findById(req.params.id)
    .eager('race')
    .then(function(hero){
      res.json(hero);
    }, next);
};

exports.create = function(req, res, next) {
  Hero
    .query()
    .insertAndFetch(req.body)
    .eager('race')
    .then(function(hero){
      res.json(hero);
    }, next);
};

exports.update = function(req, res, next) {
  Hero
    .query()
    .updateAndFetchById(req.params.id, req.body)
    .eager('race')
    .then(function(hero){
      res.json(hero);
    }, next);
};
