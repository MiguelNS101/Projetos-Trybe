import { NextFunction, Request, Response } from 'express';
import User from '../interfaces/user.interface';

const properties = ['username', 'classe', 'level', 'password'];

function validateProperties(user: User): [boolean, string | null] {
  for (let i = 0; i < properties.length; i += 1) {
    if (!Object.prototype.hasOwnProperty.call(user, properties[i])) {
      return [false, properties[i]];
    }
  }
  return [true, null];
}

function validateValues(user: User): [boolean, string | null] {
  const value = [user.username, user.password, user.classe];
  const entries = ['username', 'password', 'classe'];

  for (let i = 0; i < value.length; i += 1) {
    if (typeof value[i] !== 'string') {
      return [false, entries[i]];
    }
  }
  return [true, null];
}

function validateAmount(user: User): [boolean, string | null] {
  const value = [user.username, user.classe];
  const entries = ['username', 'classe'];
  for (let i = 0; i < value.length; i += 1) {
    if (value[i].length < 3) {
      return [false, entries[i]];
    }
  }
  return [true, null];
}

function productRequired(req: Request, res: Response, next: NextFunction) {
  const user: User = req.body;

  let [valid, property] = validateProperties(user);

  if (!valid) {
    return res.status(400).json({ message: `"${property}" is required` });
  }

  [valid, property] = validateValues(user);

  if (!valid) {
    return res.status(422).json({ message: `"${property}" must be a string` });
  }

  [valid, property] = validateAmount(user);

  if (!valid) {
    return res.status(422).json(
      { message: `"${property}" length must be at least 3 characters long` },
    );
  }

  next();
}

export default productRequired;