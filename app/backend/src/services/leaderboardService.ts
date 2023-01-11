import Model from '../database/models/TeamModel';
import { LeaderBoardInterface } from '../interfaces/leaderboardInterface';
import LeaderBoardFunc from '../funcs/leaderBoardFunc';
import { sortLeaderboard } from '../funcs/lbDataFunc';

export default class Service {
  private model = Model;
  private matchFunc = new LeaderBoardFunc();

  filterFunc = ((matche: LeaderBoardInterface) => ({
    ...matche,
    efficiency: Number(
      ((matche.totalPoints / (matche.totalGames * 3)) * 100)
        .toFixed(2),
    ),
  }));

  getLBHome = async () => {
    const matches = await this.matchFunc.getAllHomeData();
    return sortLeaderboard(
      matches.map(this.filterFunc),
    );
  };

  getLBAway = async () => {
    const matches = await this.matchFunc.getAllAwayData();
    return sortLeaderboard(
      matches.map(this.filterFunc),
    );
  };
}
