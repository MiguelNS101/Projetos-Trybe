import { Model, INTEGER, BOOLEAN } from 'sequelize';
import db from '.';
import Team from './TeamModel';

class Match extends Model {
  public homeTeam: number;
  public homeTeamGoals: number;
  public awayTeam: number;
  public awayTeamGoals: number;
  public inProgress: boolean;
}

Match.init(
  {
    homeTeam: INTEGER,
    homeTeamGoals: INTEGER,
    awayTeam: INTEGER,
    awayTeamGoals: INTEGER,
    inProgress: {
      type: BOOLEAN,
      defaultValue: true,
    },
  },
  {
    underscored: true,
    sequelize: db,
    modelName: 'match',
    timestamps: false,
  },
);

Match.belongsTo(Team, { foreignKey: 'homeTeam', as: 'teamHome' });
Match.belongsTo(Team, { foreignKey: 'awayTeam', as: 'teamAway' });

Team.hasMany(Match, { foreignKey: 'homeTeam', as: 'homeMatch' });
Team.hasMany(Match, { foreignKey: 'awayTeam', as: 'awayMatch' });

export default Match;
