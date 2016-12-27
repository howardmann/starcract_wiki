var Planet = require('../models/Planet');
var Race = require('../models/Race');
var _ = require('underscore');

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

exports.edit = function(req, res, next) {
  Planet
    .query()
    .eager('race')
    .findById(req.params.id)
    .then(function(planet){
      Race
        .query()
        .then(function(races){
          // Add new property to races to check if race belongs to planet
          var racesAdj = _.map(races, function(race){
            var result = (race.id === planet.race.id) ? true : false;
            return _.extend({}, race, {isRace: result});
          });

          res.render('planets/edit', {planet: planet, races: racesAdj});
        })
    }, next);
};

exports.update = function(req, res, next) {
  var id = req.params.id;
  console.log(req.params.id);
  Planet
    .query()
    .updateAndFetchById(id, req.body)
    .then(function(planet){
      res.redirect(`/planets/${id}`);
    }, next);
};
