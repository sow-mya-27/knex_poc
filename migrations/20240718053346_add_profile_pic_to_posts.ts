import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.table("posts", function (table) {
    table.string("attachment");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.table("posts", function (table) {
    table.dropColumn("attachment");
  });
}
