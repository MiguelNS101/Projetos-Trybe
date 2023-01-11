import { Router } from 'express';
import Controller from '../controllers/teamController';

const routes = Router();
const teamController = new Controller();

routes.get('/teams', teamController.getAll);
routes.get('/teams/:id', teamController.getById);

export default routes;
