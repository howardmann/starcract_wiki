var Planet = require('../models/Planet');
var Race = require('../models/Race');

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
  Race
    .query()
    .then(function(races){
      res.render('planets/new', {races: races});      
    }, next);
};

exports.create = function(req, res, next) {
  Planet
    .query()
    .insertAndFetch(req.body)
    .eager('race')
    .then(function(race){
      res.redirect('/planets');
    }, next);
};
