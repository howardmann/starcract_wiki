var Model = require('objection').Model;

// Extends Model constructor.
function Hero() {
  Model.apply(this, arguments);
}

Model.extend(Hero);
module.exports = Hero;

// Table name is the only required property;
Hero.tableName = 'heroes';

// This object defines the relations to other models
// relationMappings
Hero.relationMappings = {
  race: {
    relation: Model.BelongsToOneRelation,
    // We use the file
    // path version in this example to prevent require
    // loops.
    modelClass: __dirname + '/Race',
    join: {
      from: 'heroes.race_id',
      to: 'races.id'
    }
  }
};

Hero.virtualAttributes = ['score'];

Hero.prototype.score = function(){
  return this.attack + this.health;
};
