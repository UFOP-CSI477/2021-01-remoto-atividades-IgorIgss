import Knex from 'knex';

export async function seed(knex: Knex) {
  return knex('vacinas').insert([
    {
      nome: 'CoronaVac',
      fabricante: 'CoronaVac Fabricante',
      pais: 'CoronaVac Pais',
      doses: 3,
    },
    {
      nome: 'AstraZeneca',
      fabricante: 'AstraZeneca Fabricante',
      pais: 'AstraZeneca Pais',
      doses: 2,
    },
    {
      nome: 'SpiN-Tec',
      fabricante: 'SpiN-Tec Fabricante',
      pais: 'SpiN-Tec Pais',
      doses: 2,
    },
    {
      nome: 'Sputnik',
      fabricante: 'Sputnik Fabricante',
      pais: 'Sputnik Pais',
      doses: 3,
    },
    {
      nome: 'Janssen',
      fabricante: 'Janssen Fabricante',
      pais: 'Janssen Pais',
      doses: 1,
    },
    {
      nome: 'Pfizer',
      fabricante: 'Pfizer Fabricante',
      pais: 'Pfizer Pais',
      doses: 3,
    },
  ]);
}
