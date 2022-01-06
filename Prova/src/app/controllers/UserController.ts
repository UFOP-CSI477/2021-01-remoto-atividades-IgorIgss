import { Request, Response } from 'express';
import { compareSync, hashSync } from 'bcrypt';

import knex from '../../database/connection';

interface IUser {
  id: number;
  nome: string;
  email: string;
  senha: string;
}

class UserController {
  async create(req: Request, res: Response) {
    const { nome, email, senha }: IUser = req.body;

    try {
      const accountExists = await knex('usuarios')
        .where({ email })
        .first();

      if (accountExists) {
        return res.status(409).json({ error: 'Account already exists' });
      }

      if (!nome || !email || !senha) {
        return res.status(400).json({ error: 'All fields are mandatory' });
      }

      const serializedUserData = {
        nome,
        email,
        senha: hashSync(senha, 8),
      }

      await knex('usuarios').insert(serializedUserData);

      return res.sendStatus(201);
    } catch (err) {
      return res.status(500).json({ error: 'Error creating user' });
    }
  }

  async login(req: Request, res: Response) {
    const { email, senha }: IUser = req.body;

    try {
      const accountExists = await knex('usuarios')
        .where({ email })
        .first() as IUser;

      if (!accountExists) {
        return res.status(400).json({ error: 'Account does not exist' });
      }

      const passwordHashed = accountExists.senha;
      const passwordCheck = compareSync(senha, passwordHashed);
      
      if (!passwordCheck) {
        return res.status(400).json({ error: 'Wrong password' });
      }

      const serializedUserData = {
        id: accountExists.id,
        nome: accountExists.nome,
        email: accountExists.email,
      }

      return res.json(serializedUserData);
    } catch (err) {
      return res.status(500).json({ error: 'Error when logging in user' });
    }
  }

  async update (req: Request, res: Response) {
    const { id } = req.params;
    const { nome, email, senha }: IUser = req.body;

    try {
      const accountExists = await knex('usuarios')
        .where({ id })
        .first() as IUser;

      if (!accountExists) {
        return res.status(400).json({ error: 'Account does not exist' });
      }

      const serializedUserData = {
        nome: nome ? nome: accountExists.nome,
        email: email ? email: accountExists.email,
        senha: senha ? hashSync(senha, 8) : accountExists.senha,
      }

      const response = await knex('usuarios AS U')
        .where({ id })
        .update(serializedUserData)
        .returning([
          'U.id',
          'U.nome',
          'U.email',
        ]);

      return res.json(...response);
    } catch (err) {
      return res.status(500).json({ error: 'Error updating data' });
    }
  }

  async delete (req: Request, res: Response) {
    const { id } = req.params;

    try {
      const accountExists = await knex('usuarios')
        .where({ id })
        .first() as IUser;

      if (!accountExists) {
        return res.status(400).json({ error: 'Account does not exist' });
      }

      await knex('usuarios')
        .where({ id })
        .delete();

      return res.sendStatus(200);
    } catch (err) {
      return res.status(500).json({ error: 'Error when deleting account' });
    }
  }

  async show(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const user = await knex('usuarios AS U')
        .where({ id })
        .select([
          'U.id',
          'U.nome',
          'U.email',
        ])
        .first();

      if (!user) {
        return res.status(400).json({ error: 'Account does not exist' });
      }

      return res.json(user);
    } catch (err) {
      return res.status(500).json({ error: 'Error while listing user' });
    }
  }

  async index(req: Request, res: Response) {
    try {
      const users = await knex('usuarios AS U')
        .select(
          'U.id',
          'U.nome',
          'U.email',
        );

      if (!users) {
        return res.status(400)
          .json({ error: 'Error when listing users' });
      }

      return res.json(users);
    } catch (err) {
      return res.status(500).json({ error: 'Error when listing users' });
    }
  }
}

export default new UserController();
