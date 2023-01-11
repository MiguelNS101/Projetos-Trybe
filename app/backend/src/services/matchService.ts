import team from '../database/models/TeamModel';
import Model from '../database/models/MatchModel';
import {
  MatchInterface,
  MatchData,
  MatchGoals,
} from '../interfaces/matchInterface';

export default class Service {
  private model = Model;

  getAll = async () => {
    const matches = await this.model.findAll({
      include: [
        {
          model: team,
          as: 'teamHome',
          attributes: { exclude: ['id'] },
        },
        {
          model: team,
          as: 'teamAway',
          attributes: { exclude: ['id'] },
        },
      ],
    });
    const typedMatches = matches as unknown as MatchInterface[];

    return typedMatches;
  };

  getAllFiltered = async (inProgress: boolean) => {
    const matches = await this.model.findAll({
      include: [{
        model: team,
        as: 'teamHome',
        attributes: { exclude: ['id'] },
      }, {
        model: team,
        as: 'teamAway',
        attributes: { exclude: ['id'] },
      },
      ],
    });
    const typedMatches = matches as unknown as MatchInterface[];
    return typedMatches.filter((match: MatchInterface) => match.inProgress === Boolean(inProgress));
  };

  create = async (matchData: MatchData) => {
    const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = matchData;
    const hTeam = await this.model.findOne({
      where: { id: homeTeam },
    });
    const aTeam = await this.model.findOne({
      where: { id: awayTeam },
    });

    if (!aTeam || !hTeam) {
      return false;
    }

    const match = await this.model.create({
      homeTeam,
      awayTeam,
      homeTeamGoals,
      awayTeamGoals,
    });

    return match;
  };

  finish = async (id: number) => {
    await this.model.update(
      {
        inProgress: false,
      },
      { where: { id } },
    );
  };

  updateGoals = async (id: number, goals: MatchGoals) => {
    const inProgress = await this.model.findOne({
      where: { id, inProgress: true },
    });
    if (!inProgress) {
      return false;
    }
    await this.model.update(goals, { where: { id } });
  };
}
