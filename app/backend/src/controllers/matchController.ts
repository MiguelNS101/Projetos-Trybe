import { Request, Response, NextFunction } from 'express';
import MatchService from '../services/matchService';

export default class Controller {
  private mService = new MatchService();

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { inProgress } = req.query;
      let matches;
      let prog;
      if (inProgress === undefined) {
        matches = await this.mService.getAll();
      } else {
        prog = inProgress === 'true';
        matches = await this.mService.getAllFiltered(
          prog as unknown as boolean,
        );
      }

      if (!matches) return res.status(404).send({ message: 'Not Found' });
      return res.status(200).json(matches);
    } catch (error) {
      next(error);
    }
  };

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = req.body;
      const match = await this.mService.create({
        homeTeam,
        awayTeam,
        homeTeamGoals,
        awayTeamGoals,
      });

      if (!match) {
        return res
          .status(404)
          .send({ message: 'There is no team with such id!' });
      }

      return res.status(201).json(match);
    } catch (error) {
      next(error);
    }
  };

  finish = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id as unknown as number;
      await this.mService.finish(id);
      return res.status(200).json({ message: 'Finished' });
    } catch (error) {
      next(error);
    }
  };

  updateGoals = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { homeTeamGoals, awayTeamGoals } = req.body;
      const id = req.params.id as unknown as number;
      const goals = await this.mService.updateGoals(id, {
        homeTeamGoals,
        awayTeamGoals,
      });
      if (goals === false) {
        return res.status(404).send({ message: 'Match not found.' });
      }
      return res.status(200).json({ message: 'Updated successfuly' });
    } catch (error) {
      next(error);
    }
  };
}
