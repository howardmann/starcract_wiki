var Planet = require('../models/Planet');

exports.index = function(req, res, next) {
  Planet
    .query()
    .eager('race')
    .then(function(planets){
      res.render('planets/index', {
        planets: planets
      });
    }, next);
};

exports.show = function(req, res, next) {
  Planet
    .query()
    .findById(req.params.id)
    .eager('race')
    .then(function(planet){
      res.render('planets/show', {
        planet: planet
      });
    }, next);
};

exports.new = function(req, res, next) {
  res.render('planets/new');
};
