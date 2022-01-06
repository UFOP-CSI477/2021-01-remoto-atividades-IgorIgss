import Knex from 'knex';

export async function up(knex: Knex) {
  return knex.schema.createTable('registros', table => {
    table.increments('id').primary;
    table.integer('pessoa_id')
      .notNullable()
      .references('id')
      .inTable('pessoas')
      .onUpdate('CASCADE');
    table.integer('unidade_id')
      .notNullable()
      .references('id')
      .inTable('unidades')
      .onUpdate('CASCADE')
    table.integer('vacina_id')
      .notNullable()
      .references('id')
      .inTable('vacinas')
      .onUpdate('CASCADE')
    table.specificType('dose', 'smallint').notNullable();
    table.date('data').notNullable();
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable('registros');
}
