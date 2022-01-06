import { Router } from 'express';

import userRouter from './user.routes';
import peopleRouter from './people.routes';
import vaccineRouter from './vaccine.routes';
import unityRouter from './unity.routes';
import registerRouter from './register.routes';

const routes = Router();

routes.use('/user', userRouter);
routes.use('/people', peopleRouter);
routes.use('/vaccine', vaccineRouter);
routes.use('/unity', unityRouter);
routes.use('/register', registerRouter);

export default routes;
