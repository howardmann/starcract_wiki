var Hero = require('../models/Hero');

exports.index = function(req, res, next) {
  Hero
    .query()
    .eager('race')
    .then(function(heroes){
      res.json(heroes);
    }, next);
};
