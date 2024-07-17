import { Knex } from 'knex';

exports.up = function(knex: Knex): Promise<void> {
  return knex.schema.createTable('comments', table => {
    table.increments('id').primary();
    table.integer('post_id').unsigned().references('id').inTable('posts');
    table.integer('user_id').unsigned().references('id').inTable('users');
    table.text('comment');
    table.timestamps(true, true);
  });
};

exports.down = function(knex: Knex): Promise<void> {
  return knex.schema.dropTable('comments');
};
