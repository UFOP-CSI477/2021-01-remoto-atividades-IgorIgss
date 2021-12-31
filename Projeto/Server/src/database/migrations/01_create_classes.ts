import Knex from 'knex';

//Criação da Tabela
export async function up(Knex: Knex ) {
    return Knex.schema.createTable('classes', table => {
        table.increments('id').primary();
        table.string('subject').notNullable();
        table.decimal('cost').notNullable();

        //Realacionamento com o usuario que irá criar a aula
        table.integer('user_id')
            .notNullable()
            .references('id')
            .inTable('users')
            .onUpdate('CASCADE')
            .onDelete('CASCADE'); //Se o professor for deletado da plataforma todas as suas aulas serão deletadas
    });
}

//Deletar a tabela
export async function down(Knex: Knex) {
    return Knex.schema.dropTable('classes')
}
