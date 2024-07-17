import { Knex } from 'knex';

exports.up = function(knex: Knex): Promise<void> {
  return knex.schema.createTable('users', table => {
    table.increments('id').primary();
    table.string('name');
    table.string('email').unique();
    table.timestamps(true, true);
  });
};

exports.down = function(knex: Knex): Promise<void> {
  return knex.schema.dropTable('users');
};
