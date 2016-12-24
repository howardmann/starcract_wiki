var Model = require('objection').Model;

// Extends Model constructor.
function Planet() {
  Model.apply(this, arguments);
}

Model.extend(Planet);
module.exports = Planet;

// Table name is the only required property;
Planet.tableName = 'planets';

// This object defines the relations to other models
// relationMappings
Planet.relationMappings = {
  race: {
    relation: Model.BelongsToOneRelation,
    // We use the file
    // path version in this example to prevent require
    // loops.
    modelClass: __dirname + '/Race',
    join: {
      from: 'planets.race_id',
      to: 'races.id'
    }
  }
};
