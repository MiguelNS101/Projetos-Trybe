import { Router } from 'express';
import Controller from '../controllers/leaderboardController';

const routes = Router();

const leaderboardController = new Controller();

routes.get('/leaderboard/home', leaderboardController.getLBHome);
routes.get('/leaderboard/away', leaderboardController.getLBAway);

export default routes;
