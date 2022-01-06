import { Router } from 'express';

import RegisterController from '../app/controllers/RegisterController';

const registerRouter = Router();

registerRouter.post('/create', RegisterController.create);
registerRouter.put('/update/:id', RegisterController.update);
registerRouter.delete('/delete/:id', RegisterController.delete);
registerRouter.get('/show/:id', RegisterController.show);
registerRouter.get('/index', RegisterController.index);

export default registerRouter;
