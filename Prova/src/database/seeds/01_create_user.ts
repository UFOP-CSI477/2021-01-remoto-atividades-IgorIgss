import Knex from 'knex';
import bcrypt from 'bcrypt';

const hash = bcrypt.hashSync('123456789', 8);

export async function seed(knex: Knex) {
  return knex('usuarios').insert([
    {
      nome: 'User1',
      email: 'user1@mail.com',
      senha: hash,
    },
    {
      nome: 'User2',
      email: 'user2@mail.com',
      senha: hash,
    },
  ]);
}
