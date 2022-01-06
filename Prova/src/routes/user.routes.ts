import { Router } from 'express';

import UserController from '../app/controllers/UserController';

const userRouter = Router();

userRouter.post('/create', UserController.create);
userRouter.post('/login', UserController.login);
userRouter.put('/update/:id', UserController.update);
userRouter.delete('/delete/:id', UserController.delete);
userRouter.get('/show/:id', UserController.show);
userRouter.get('/index', UserController.index);

export default userRouter;
