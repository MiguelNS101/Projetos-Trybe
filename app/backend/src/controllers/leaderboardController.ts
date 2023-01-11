import { Request, Response, NextFunction } from 'express';
import LeaderboardService from '../services/leaderboardService';

export default class Controller {
  private lService = new LeaderboardService();

  getLBHome = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const teams = await this.lService.getLBHome();
      if (!teams) return res.status(404).send({ message: 'Not Found' });
      return res.status(200).json(teams);
    } catch (error) {
      next(error);
    }
  };

  getLBAway = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const teams = await this.lService.getLBAway();
      if (!teams) return res.status(404).send({ message: 'Not Found' });
      return res.status(200).json(teams);
    } catch (error) {
      next(error);
    }
  };
}
