import knex from 'knex';
import Knex from 'knex';

//Criação da Tabela
export async function up(Knex: Knex ) {
    return Knex.schema.createTable('users', table => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.string('avatar').notNullable();
        table.string('whatsapp').notNullable();
        table.string('bio').notNullable();
    });
}

//Deletar a tabela
export async function down(Knex: Knex) {
    return Knex.schema.dropTable('users')
}
