import { Router } from 'express';

import UnityController from '../app/controllers/UnityController';

const unityRouter = Router();

unityRouter.get('/index', UnityController.index);
unityRouter.delete('/delete/:id', UnityController.delete);

export default unityRouter;
