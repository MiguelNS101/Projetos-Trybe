import { LeaderBoardInterface } from '../interfaces/leaderboardInterface';

export function ownGoal(obj: any, matchType: string) {
  return obj[matchType].reduce(
    (goals: number, lGoals: any) =>
      goals + lGoals.awayTeamGoals,
    0,
  );
}

export function favorGoal(obj: any, matchType: string) {
  return obj[matchType].reduce(
    (goals: number, lGoals: any) => goals + lGoals.homeTeamGoals,
    0,
  );
}

export function drawCalc(obj: any, matchType: string) {
  return obj[matchType].reduce((goals: number, lGoals: any) => {
    let resp = goals;
    if (lGoals.homeTeamGoals === lGoals.awayTeamGoals) resp += 1;
    return resp;
  }, 0);
}

export function losesCalc(obj: any, matchType: string) {
  return obj[matchType].reduce((goals: number, lGoals: any) => {
    let total = goals;
    if (lGoals.homeTeamGoals < lGoals.awayTeamGoals) total += 1;
    return total;
  }, 0);
}

export function victoryCalc(obj: any, matchType: string) {
  return obj[matchType].reduce((goals: number, lGoals: any) => {
    let total = goals;
    if (lGoals.awayTeamGoals < lGoals.homeTeamGoals) total += 1;
    return total;
  }, 0);
}

export function totalPointsHome(obj: any, matchType: string) {
  return obj[matchType].reduce((goals: number, lGoals: any) => {
    let total = goals;
    if (lGoals.homeTeamGoals > lGoals.awayTeamGoals) total += 3;
    if (lGoals.homeTeamGoals === lGoals.awayTeamGoals) total += 1;
    return total;
  }, 0);
}

export function totalPointsAway(obj: any, matchType: string) {
  return obj[matchType].reduce((goals: number, lGoals: any) => {
    let total = goals;
    if (lGoals.homeTeamGoals < lGoals.awayTeamGoals) total += 3;
    if (lGoals.homeTeamGoals === lGoals.awayTeamGoals) total += 1;
    return total;
  }, 0);
}

export function sortLeaderboard(matches: LeaderBoardInterface[]) {
  return matches.sort((a: LeaderBoardInterface, b: LeaderBoardInterface) =>
    b.totalPoints - a.totalPoints
        || b.totalVictories - a.totalVictories
        || b.goalsBalance - a.goalsBalance
        || b.goalsFavor - a.goalsFavor
        || b.goalsOwn - a.goalsOwn);
}
