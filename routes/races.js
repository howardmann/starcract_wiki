var Race = require('../models/Race');
var _ = require('underscore');

exports.index = function(req, res, next) {
  Race
    .query()
    .eager('planets')
    .then(function(races){
      // Limit planets nested resource to name only using underscorejs

      races.forEach(function(race){
        race.planets = _.pluck(race.planets, 'name');
      });
      res.json(races);
    }, next);
};
