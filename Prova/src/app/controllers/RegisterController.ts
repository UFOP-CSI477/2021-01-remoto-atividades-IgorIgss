import { Request, Response } from 'express';

import knex from '../../database/connection';

interface IRegister {
  id: number;
  pessoa_id: number;
  unidade_id: number;
  vacina_id: number;
  dose: number;
  data: Date;
}

class RegisterController {
  async create(req: Request, res: Response) {
    const { pessoa_id, unidade_id, vacina_id, dose, data }: IRegister = req.body;

    try {
      if (!pessoa_id || !unidade_id || !vacina_id || !dose || !data) {
        return res.status(400).json({ error: 'All fields are mandatory' });
      }

      const serializedUserData = {
        pessoa_id,
        unidade_id,
        vacina_id,
        dose,
        data
      }

      await knex('registros').insert(serializedUserData);

      return res.sendStatus(201);
    } catch (err) {
      return res.status(500).json({ error: 'Error on register' });
    }
  }

  async update (req: Request, res: Response) {
    const { id } = req.params;
    const { pessoa_id, unidade_id, vacina_id, dose, data }: IRegister = req.body;

    try {
      const registerExists = await knex('registros')
        .where({ id })
        .first() as IRegister;

      if (!registerExists) {
        return res.status(400).json({ error: 'Register does not exist' });
      }

      const serializedRegisterData = {
        pessoa_id: pessoa_id ? pessoa_id : registerExists.pessoa_id,
        unidade_id: unidade_id ? unidade_id : registerExists.unidade_id,
        vacina_id: vacina_id ? vacina_id : registerExists.vacina_id,
        dose: dose ? dose : registerExists.dose,
        data: data ? new Date(data) : registerExists.data
      }

      const response = await knex('registros AS R')
        .where({ id })
        .update(serializedRegisterData)
        .returning('*');

      return res.json(...response);
    } catch (err) {
      return res.status(500).json({ error: 'Error updating data' });
    }
  }

  async delete (req: Request, res: Response) {
    const { id } = req.params;

    try {
      const registerExists = await knex('registros')
        .where({ id })
        .first() as IRegister;

      if (!registerExists) {
        return res.status(400).json({ error: 'Register does not exist' });
      }

      await knex('registros')
        .where({ id })
        .delete();

      return res.sendStatus(200);
    } catch (err) {
      return res.status(500).json({ error: 'Error when deleting register' });
    }
  }

  async show(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const register = await knex('registros AS R')
        .join('pessoas AS P', 'P.id', 'R.pessoa_id')
        .join('vacinas AS V', 'V.id', 'R.vacina_id')
        .join('unidades AS U', 'U.id', 'R.unidade_id')
        .where('R.id', id)
        .select([
          'R.*',
          'P.nome',
          'P.bairro',
          'P.cidade',
          'P.estado',
          'P.data_nascimento',
          'P.cpf',
          'V.nome AS vacina_nome',
          'V.fabricante',
          'V.pais',
          'V.doses',
          'U.nome AS unidade_nome',
          'U.cidade AS unidade_cidade',
          'U.estado AS unidade_estado',
        ])
        .first();

      const serializedRegisterData = {
        registro: {
          registro_id: register.id,
          pessoa_id: register.pessoa_id,
          vacina_id: register.vacina_id,
          unidade_id: register.unidade_id,
          dose: register.dose,
          data: register.data,
        },
        pessoa: {
          nome: register.nome,
          bairro: register.bairro,
          cidade: register.cidade,
          estado: register.estado,
          data_nascimento: register.data_nascimento,
          cpf: register.cpf,
        },
        vacina: {
          nome: register.vacina_nome,
          fabricante: register.fabricante,
          pais: register.pais,
          doses: register.doses,
        },
        unidade: {
          nome: register.unidade_nome,
          cidade: register.unidade_cidade,
          estado: register.unidade_estado,
        },
      };

      if (!register) {
        return res.status(400).json({ error: 'Register does not exist' });
      }

      return res.json(serializedRegisterData);
    } catch (err) {
      return res.status(500).json({ error: 'Error while listing register' });
    }
  }

  async index(req: Request, res: Response) {
    try {
      const registers = await knex('registros AS R')
      .join('pessoas AS P', 'P.id', 'R.pessoa_id')
      .join('vacinas AS V', 'V.id', 'R.vacina_id')
      .join('unidades AS U', 'U.id', 'R.unidade_id')
      .select([
        'R.*',
        'P.nome',
        'P.bairro',
        'P.cidade',
        'P.estado',
        'P.data_nascimento',
        'P.cpf',
        'V.nome AS vacina_nome',
        'V.fabricante',
        'V.pais',
        'V.doses',
        'U.nome AS unidade_nome',
        'U.cidade AS unidade_cidade',
        'U.estado AS unidade_estado',
      ]);

      const serializedRegistersData = registers.map(register => ({
        registro: {
          registro_id: register.id,
          pessoa_id: register.pessoa_id,
          vacina_id: register.vacina_id,
          unidade_id: register.unidade_id,
          dose: register.dose,
          data: register.data,
        },
        pessoa: {
          nome: register.nome,
          bairro: register.bairro,
          cidade: register.cidade,
          estado: register.estado,
          data_nascimento: register.data_nascimento,
          cpf: register.cpf,
        },
        vacina: {
          nome: register.vacina_nome,
          fabricante: register.fabricante,
          pais: register.pais,
          doses: register.doses,
        },
        unidade: {
          nome: register.unidade_nome,
          cidade: register.unidade_cidade,
          estado: register.unidade_estado,
        }
      }));

      if (!registers) {
        return res.status(400)
          .json({ error: 'Error when listing registers' });
      }

      return res.json(serializedRegistersData);
    } catch (err) {
      return res.status(500).json({ error: 'Error when listing registers' });
    }
  }
}

export default new RegisterController();
