import { Request, Response } from 'express';

import knex from '../../database/connection';

interface IPeople {
  id: number;
  nome: string;
  bairro: string;
  cidade: string;
  estado: string;
  data_nascimento: string;
  cpf: string;
}

class PeopleController {
  async index(req: Request, res: Response) {
    try {
      const peoples = await knex('pessoas AS P').select('*')
        .orderBy('nome', 'asc');

      if (!peoples) {
        return res.status(400)
          .json({ error: 'Error when listing peoples' });
      }

      return res.json(peoples);
    } catch (err) {
      return res.status(500).json({ error: 'Error when listing peoples' });
    }
  }

  async create(req: Request, res: Response) {
    const {
      nome,
      bairro,
      cidade,
      estado,
      data_nascimento,
      cpf
    }: IPeople = req.body;

    try {
      const accountExists = await knex('pessoas')
        .where({ nome })
        .first();

      if (accountExists) {
        return res.status(409).json({ error: 'People already exists' });
      }

      if (!nome || !bairro || !cidade || !estado || !data_nascimento || !cpf) {
        return res.status(400).json({ error: 'All fields are mandatory' });
      }

      const serializedPeopleData = {
        nome,
        bairro,
        cidade,
        estado,
        data_nascimento: new Date(data_nascimento),
        cpf
      }

      await knex('pessoas').insert(serializedPeopleData);

      return res.sendStatus(201);
    } catch (err) {
      return res.status(500).json({ error: 'Error creating people' });
    }
  }
}

export default new PeopleController();
