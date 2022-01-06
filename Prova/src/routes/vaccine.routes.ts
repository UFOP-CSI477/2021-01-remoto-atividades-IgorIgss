import { Router } from 'express';

import VaccineController from '../app/controllers/VaccineController';

const vaccineRouter = Router();

vaccineRouter.get('/totalVaccineApplied', VaccineController.totalVaccineApplied);
vaccineRouter.get('/index', VaccineController.index);
vaccineRouter.post('/create', VaccineController.create);
vaccineRouter.put('/update/:id', VaccineController.update);

export default vaccineRouter;
