export type MatchInterface = {
  id: number;
  homeTeam: number;
  homeTeamGoals: number;
  awayTeam: number;
  awayTeamGoals: number;
  inProgress: boolean;
  teamHome: {
    teamName: string;
  };
  teamAway: {
    teamName: string;
  };
};

export type MatchData = Omit<MatchInterface, 'id' | 'inProgress' | 'teamHome' | 'teamAway'>;

export type MatchGoals = {
  homeTeamGoals: number,
  awayTeamGoals: number,
};
