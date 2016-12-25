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
