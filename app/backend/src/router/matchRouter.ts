import { Router } from 'express';
import Controller from '../controllers/matchController';
import validateToken from '../middlewares/tokenMiddleware';
import validationMatch from '../middlewares/matchMiddleware';

const routes = Router();

const matchController = new Controller();

routes.get('/matches', matchController.getAll);
routes.post('/matches', validateToken, validationMatch, matchController.create);
routes.patch('/matches/:id/finish', matchController.finish);
routes.patch('/matches/:id', matchController.updateGoals);

export default routes;
