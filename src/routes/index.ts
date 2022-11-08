import Router, { Application }  from 'express';
import { taskRouter } from './tasks';

export const useRouter = (app: Application) => {
    const apiRouter = Router();
    apiRouter.use('/task', taskRouter);

    app.use('/api/', apiRouter);
}