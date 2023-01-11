import { Request, Response, NextFunction } from 'express';
import TeamService from '../services/teamService';

export default class Controller {
  private tService = new TeamService();

  getAll = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const teams = await this.tService.getAll();
      return res.status(200).json(teams);
    } catch (error) {
      next(error);
    }
  };

  getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const team = await this.tService.getById(id);
      if (!team) {
        return res.status(404).send({ message: 'Not Found' });
      }
      return res.status(200).json(team);
    } catch (error) {
      next(error);
    }
  };
}
