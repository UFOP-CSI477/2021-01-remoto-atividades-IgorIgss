import Knex from 'knex';

export async function seed(knex: Knex) {
  return knex('unidades').insert([
    {
      nome: 'Posto de saúde',
      bairro: 'Amazonas',
      cidade: 'São Paulo',
      estado: 'SP',
    },
    {
      nome: 'Hospital',
      bairro: 'Centro',
      cidade: 'Belo Horizonte',
      estado: 'MG',
    },
    {
      nome: 'Centro de saúde',
      bairro: 'Lagoa',
      cidade: 'Viçosa',
      estado: 'MG',
    },
  ]);
}
