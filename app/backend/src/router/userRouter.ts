import { Router } from 'express';
import Controller from '../controllers/userController';
import userMiddleware from '../middlewares/userMiddleware';

const routes = Router();
const userController = new Controller();

routes.post('/login', userMiddleware, userController.login);
routes.get('/login/validate', userController.validate);

export default routes;
