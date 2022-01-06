import Knex from 'knex';

export async function seed(knex: Knex) {
  return knex('pessoas').insert([
    {
      nome: 'Pessoa 1',
      bairro: 'Água Fresca',
      cidade: 'Itabira',
      estado: 'MG',
      data_nascimento: new Date('2000-12-31'),
      cpf: '12345678910'
    },
    {
      nome: 'Pessoa 2',
      bairro: 'Centro',
      cidade: 'Belo Horizonte',
      estado: 'MG',
      data_nascimento: new Date('2000-12-30'),
      cpf: '10987654321'
    },
    {
      nome: 'Pessoa 3',
      bairro: 'Amazonas',
      cidade: 'São Paulo',
      estado: 'SP',
      data_nascimento: new Date('2000-12-29'),
      cpf: '10147852963'
    },
    {
      nome: 'Pessoa 4',
      bairro: 'Centro',
      cidade: 'João Monlevade',
      estado: 'MG',
      data_nascimento: new Date('2000-12-28'),
      cpf: '10321456987'
    },
  ]);
}
