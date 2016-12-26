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
