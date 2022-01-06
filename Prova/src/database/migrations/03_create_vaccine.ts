import Knex from 'knex';

export async function up(knex: Knex) {
  return knex.schema.createTable('vacinas', table => {
    table.increments('id').primary;
    table.string('nome', 100).notNullable();
    table.string('fabricante', 100).notNullable();
    table.string('pais', 100).notNullable();
    table.specificType('doses', 'smallint').notNullable();
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable('vacinas');
}
