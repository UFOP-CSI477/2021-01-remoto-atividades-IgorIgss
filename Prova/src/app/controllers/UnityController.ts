import { Request, Response } from 'express';

import knex from '../../database/connection';

interface IUnity {
  id: number;
  nome: string;
  bairro: string;
  cidade: string;
  estado: string;
}

interface IRegister {
  pessoa_id: number;
  unidade_id: number;
  vacina_id: number;
  dose: number;
  data: Date;
}

class UnityController {
  async index(req: Request, res: Response) {
    try {
      const units = await knex('unidades AS U')
      .select('*')
      .orderBy('nome', 'asc');

      if (!units) {
        return res.status(400)
          .json({ error: 'Error when listing units' });
      }

      return res.json(units);
    } catch (err) {
      return res.status(500).json({ error: 'Error when listing units' });
    }
  }

  async delete (req: Request, res: Response) {
    const { id } = req.params;

    try {
      const unityExists = await knex('unidades')
        .where({ id })
        .first() as IUnity;

      const unityExistsOnRegisterTable = await knex('registros')
        .where({ unidade_id: id })
        .first() as IRegister;

      if (!unityExists) {
        return res.status(400).json({ error: 'Unity does not exist' });
      }

      if (unityExistsOnRegisterTable) {
        return res.status(409).json({ error: 'Cannot delete drive it is in use!' });
      }

      await knex('unidades')
        .where({ id })
        .delete();

      return res.sendStatus(200);
    } catch (err) {
      return res.status(500).json({ error: 'Error when deleting unity' });
    }
  }
}

export default new UnityController();
