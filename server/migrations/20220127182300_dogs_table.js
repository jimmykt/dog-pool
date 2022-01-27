/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.up = function (knex) {
  return knex.schema.createTable("dogs", (table) => {
    table.increments("id").primary();
    table.string("dog_name").notNullable();
    table.string("birthday").notNullable();
    table.string("dog_info", 5000).notNullable();
    table.integer("owner_id").unsigned();
    table.foreign("owner_id").references("users.id");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.down = function (knex) {
  return knex.schema.dropTable("dogs");
};
