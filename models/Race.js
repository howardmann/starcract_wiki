var Model = require('objection').Model;
var Planet = require('./Planet');

// Extends Model constructor to User.
function Race() {
  Model.apply(this, arguments);
}

Model.extend(Race);
module.exports = Race;

// Table name is the only required property;
Race.tableName = 'races';

// This object defines the relations to other models
// relationMappings
Race.relationMappings = {
  planets: {
    relation: Model.HasManyRelation,
    modelClass: Planet,
    join: {
      from: 'races.id',
      to: 'planets.race_id'
    }
  }
};
