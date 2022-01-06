import { Router } from 'express';

import PeopleController from '../app/controllers/PeopleController';

const peopleRouter = Router();

peopleRouter.get('/index', PeopleController.index);
peopleRouter.post('/create', PeopleController.create);

export default peopleRouter;
