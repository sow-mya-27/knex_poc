import { Knex } from 'knex';

exports.up = function(knex: Knex): Promise<void> {
  return knex.schema.createTable('posts', table => {
    table.increments('id').primary();
    table.integer('user_id').unsigned().references('id').inTable('users');
    table.string('title');
    table.text('body');
    table.timestamps(true, true);
  });
};

exports.down = function(knex: Knex): Promise<void> {
  return knex.schema.dropTable('posts');
};
