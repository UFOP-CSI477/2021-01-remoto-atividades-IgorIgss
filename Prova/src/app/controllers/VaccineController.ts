import { Request, Response } from 'express';

import knex from '../../database/connection';

interface IVaccine {
  id: number;
  nome: string;
  fabricante: string;
  pais: string;
  doses: number;
}

class VaccineController {
  async totalVaccineApplied(req: Request, res: Response) {
    try {
      const vaccines = await knex('registros AS R')
        .select('V.nome AS vacina')
        .sum({ quantidade: 'R.dose' })
        .join('vacinas AS V', 'V.id', 'R.vacina_id')
        .groupBy('vacina') as { vacina: string; quantidade: number }[];

      const serializedVaccineData = {
        dados: vaccines.map(vaccine => ({
          vacina: vaccine.vacina,
          quantidade: Number(vaccine.quantidade),
          porcentagem: Number((Number(vaccine.quantidade) * 100) / vaccines
            .reduce((acc, item) => acc + Number(item.quantidade), 0)).toFixed(2)
        })),
        totalGeral: vaccines
          .reduce((acc, item) => acc + Number(item.quantidade), 0)
      };

      return res.json(serializedVaccineData);
    } catch (err) {
      return res.status(500).json({ error: 'Error when listing total vaccine applied' });
    }
  }

  async index(req: Request, res: Response) {
    try {
      const vaccines = await knex('vacinas AS V').select('*')
        .orderBy('nome', 'asc');

      if (!vaccines) {
        return res.status(400)
          .json({ error: 'Error when listing vaccines' });
      }

      return res.json(vaccines);
    } catch (err) {
      return res.status(500).json({ error: 'Error when listing vaccines' });
    }
  }

  async create(req: Request, res: Response) {
    const { nome, fabricante, pais, doses }: IVaccine = req.body;

    try {
      const accountExists = await knex('vacinas')
        .where({ nome })
        .first();

      if (accountExists) {
        return res.status(409).json({ error: 'Vaccine already exists' });
      }

      if (!nome || !fabricante || !pais || !doses) {
        return res.status(400).json({ error: 'All fields are mandatory' });
      }

      const serializedVaccineData = {
        nome,
        fabricante,
        pais,
        doses
      }

      await knex('vacinas').insert(serializedVaccineData);

      return res.sendStatus(201);
    } catch (err) {
      return res.status(500).json({ error: 'Error creating vaccine' });
    }
  }

  async update (req: Request, res: Response) {
    const { id } = req.params;
    const { nome, fabricante, pais, doses }: IVaccine = req.body;

    try {
      const vaccineExists: IVaccine = await knex('vacinas')
        .where({ id })
        .first();

      if (!vaccineExists) {
        return res.status(400).json({ error: 'Vaccine does not exist' });
      }

      const serializedVaccineData = {
        nome: nome ? nome: vaccineExists?.nome,
        fabricante: fabricante ? fabricante : vaccineExists?.fabricante,
        pais: pais ? pais : vaccineExists?.pais,
        doses: doses ? doses : vaccineExists?.doses
      }

      const response = await knex('vacinas AS V')
        .where({ id })
        .update(serializedVaccineData)
        .returning('*');

      return res.json(...response);
    } catch (err) {
      return res.status(500).json({ error: 'Error updating data' });
    }
  }
}

export default new VaccineController();
