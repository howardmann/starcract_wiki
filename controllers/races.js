var Race = require('../models/Race');
var _ = require('underscore');

exports.index = function(req, res, next) {
  Race
    .query()
    .eager('planets')
    .then(function(races){
      // Limit planets nested resource to array of names only using underscorejs
      races.forEach(function(race){
        race.planets = _.pluck(race.planets, 'name');
      });
      res.json(races);
    }, next);
};

exports.show = function(req, res, next) {
  Race
    .query()
    .eager('planets')
    .findById(req.params.id)
    .then(function(race){
      res.json(race);
    }, next)
};

exports.create = function(req, res, next) {
  Race
    .query()
    .insertAndFetch(req.body)
    .then(function(race){
      res.json(race);
    }, next)
};

exports.update = function(req, res, next) {
  Race
    .query()
    .updateAndFetchById(req.params.id, req.body)
    .then(function(race){
      res.json(race);
    }, next)
};

exports.destroy = function(req, res, next) {
  Race
    .query()
    .findById(req.params.id)
    .then(function(race){
      Race
      .query()
      .deleteById(req.params.id).then(function(){
        res.json(race);
      })
    }, next);
};
