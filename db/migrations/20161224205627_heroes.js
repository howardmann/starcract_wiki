
exports.up = function(knex, Promise) {
  return knex.schema.createTable('heroes', function(table){
    table.increments();
    table.string('name').notNullable();
    table.text('description').notNullable();
    table.integer('health');
    table.integer('attack');
    table.integer('race_id').unsigned().references('races.id').onDelete('set null');
    table.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'));
    table.timestamp('updated_at').notNullable().defaultTo(knex.raw('now()'));
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("heroes");
};
