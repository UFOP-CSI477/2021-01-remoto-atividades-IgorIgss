import 'dotenv/config';

import Knex from 'knex';

export async function up(knex: Knex) {
  return knex.schema.createTable('usuarios', table => {
    table.increments('id').primary;
    table.string('nome').notNullable();
    table.string('email').notNullable().unique();
    table.string('senha').notNullable();
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable('usuarios');
}
