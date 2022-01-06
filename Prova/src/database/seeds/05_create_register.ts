import Knex from 'knex';

export async function seed(knex: Knex) {
  return knex('registros').insert([
    {
      pessoa_id: 1,
      unidade_id: 1,
      vacina_id: 6,
      dose: 1,
      data: new Date()
    },
    {
      pessoa_id: 1,
      unidade_id: 1,
      vacina_id: 6,
      dose: 2,
      data: new Date()
    },
    {
      pessoa_id: 2,
      unidade_id: 2,
      vacina_id: 6,
      dose: 2,
      data: new Date()
    },
    {
      pessoa_id: 2,
      unidade_id: 2,
      vacina_id: 6,
      dose: 3,
      data: new Date()
    },
    {
      pessoa_id: 3,
      unidade_id: 3,
      vacina_id: 1,
      dose: 2,
      data: new Date()
    },
    {
      pessoa_id: 4,
      unidade_id: 2,
      vacina_id: 1,
      dose: 1,
      data: new Date()
    },
  ]);
}
