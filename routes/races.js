var Race = require('../models/Race');
var _ = require('underscore');

exports.index = function(req, res, next) {
  Race
    .query()
    .eager('planets')
    .then(function(data){
      res.json(data);
    }, next);
};
