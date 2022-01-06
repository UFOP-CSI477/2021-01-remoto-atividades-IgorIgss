import Knex from 'knex';

export async function up(knex: Knex) {
  return knex.schema.createTable('unidades', table => {
    table.increments('id').primary;
    table.string('nome', 100).notNullable();
    table.string('bairro', 100).notNullable();
    table.string('cidade', 100).notNullable();
    table.string('estado', 2).notNullable();
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable('unidades');
}
