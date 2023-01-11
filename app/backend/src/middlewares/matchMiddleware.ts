import { NextFunction, Request, Response } from 'express';
import { MatchData } from '../interfaces/matchInterface';

const properties = ['homeTeam', 'awayTeam', 'homeTeamGoals', 'awayTeamGoals'];

function validateProperties(match: MatchData): [boolean, string | null] {
  for (let i = 0; i < properties.length; i += 1) {
    if (!Object.prototype.hasOwnProperty.call(match, properties[i])) {
      return [false, properties[i]];
    }
  }
  return [true, null];
}

function validateValues(match: MatchData): [boolean, string | null] {
  const entries = Object.entries(match);
  for (let i = 0; i < entries.length; i += 1) {
    const [property, value] = entries[i];
    if (!value) {
      return [false, property];
    }
  }
  return [true, null];
}

function validationMatch(req: Request, res: Response, next: NextFunction) {
  const { homeTeam, awayTeam } = req.body;
  if (homeTeam === awayTeam) {
    return res.status(401).send({
      message: 'It is not possible to create a match with two equal teams',
    });
  }

  const match: MatchData = req.body;

  let [valid] = validateProperties(match);
  if (!valid) {
    return res.status(400).send({ message: 'All fields must be filled' });
  }

  [valid] = validateValues(match);
  if (!valid) {
    return res.status(400).send({ message: 'All fields must be filled' });
  }

  next();
}

export default validationMatch;
