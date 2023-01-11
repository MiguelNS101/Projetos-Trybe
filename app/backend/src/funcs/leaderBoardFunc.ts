import TeamModel from '../database/models/TeamModel';
import TeamMatch from '../database/models/MatchModel';
import { LeaderBoardInterface } from '../interfaces/leaderboardInterface';
import {
  ownGoal,
  favorGoal,
  drawCalc,
  losesCalc,
  victoryCalc,
  totalPointsHome,
  totalPointsAway,
} from './lbDataFunc';

const info = {
  name: '',
  totalPoints: 0,
  totalGames: 0,
  totalVictories: 0,
  totalDraws: 0,
  totalLosses: 0,
  goalsFavor: 0,
  goalsOwn: 0,
  goalsBalance: 0,
  efficiency: 0,
};

export default class LeaderBoardFunc {
  private model = TeamModel;

  getMatches = async (local: string) => {
    const data = await this.model.findAll({
      include: {
        model: TeamMatch,
        as: local,
        attributes: { exclude: ['id', 'homeTeam', 'awayTeam', 'inProgress'] },
        where: { inProgress: false },
      },
      attributes: { exclude: ['id'] },
    });
    return data;
  };

  getHomePoints = (matches: object[]) => {
    const points = matches.reduce((acc: LeaderBoardInterface[], curr: any) => {
      const hMatch = 'homeMatch';
      const inf = { ...info };
      inf.name = curr.teamName;
      inf.totalGames = curr[hMatch].length;
      inf.goalsOwn = ownGoal(curr, hMatch);
      inf.goalsFavor = favorGoal(curr, hMatch);
      inf.totalDraws = drawCalc(curr, hMatch);
      inf.totalLosses = losesCalc(curr, hMatch);
      inf.totalVictories = victoryCalc(curr, hMatch);
      inf.goalsBalance = inf.goalsFavor - inf.goalsOwn;
      inf.totalPoints = totalPointsHome(curr, hMatch);
      acc.push(inf);
      return acc;
    }, []);
    return points;
  };

  getAwayPoints = (matches: object[]) => {
    const points = matches.reduce((acc: LeaderBoardInterface[], curr: any) => {
      const aMatch = 'awayMatch';
      const inf = { ...info };
      inf.name = curr.teamName;
      inf.totalGames = curr[aMatch].length;
      inf.goalsOwn = favorGoal(curr, aMatch);
      inf.goalsFavor = ownGoal(curr, aMatch);
      inf.totalDraws = drawCalc(curr, aMatch);
      inf.totalLosses = victoryCalc(curr, aMatch);
      inf.totalVictories = losesCalc(curr, aMatch);
      inf.goalsBalance = inf.goalsFavor - inf.goalsOwn;
      inf.totalPoints = totalPointsAway(curr, aMatch);
      acc.push(inf);
      return acc;
    }, []);
    return points;
  };

  getAllHomeData = async () => {
    const hMatches = await this.getMatches('homeMatch');
    const homePoints = this.getHomePoints(hMatches);
    return homePoints;
  };

  getAllAwayData = async () => {
    const aMatches = await this.getMatches('awayMatch');
    const awayPoints = this.getAwayPoints(aMatches);
    return awayPoints;
  };
}
