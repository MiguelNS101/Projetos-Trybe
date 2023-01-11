import { Model, STRING } from 'sequelize';
import db from '.';

class Team extends Model {
  public teamName: string;
}

Team.init(
  {
    teamName: STRING,
  },
  {
    underscored: true,
    sequelize: db,
    modelName: 'team',
    timestamps: false,
  },
);

export default Team;
