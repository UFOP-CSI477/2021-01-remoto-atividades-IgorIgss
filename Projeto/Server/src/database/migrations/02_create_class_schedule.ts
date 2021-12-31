import Knex from 'knex';

//Criação da Tabela
export async function up(Knex: Knex ) {
    return Knex.schema.createTable('class_schedule', table => {
        table.increments('id').primary();

        table.integer('week_day').notNullable();
        table.integer('from').notNullable();
        table.integer('to').notNullable();

        //Realacionamento com o usuario que irá criar a aula
        table.integer('class_id')
            .notNullable()
            .references('id')
            .inTable('classes')
            .onUpdate('CASCADE')
            .onDelete('CASCADE'); //Se o professor for deletado da plataforma todas as suas aulas serão deletadas
    });
}

//Deletar a tabela
export async function down(Knex: Knex) {
    return Knex.schema.dropTable('class_schedule')
}
