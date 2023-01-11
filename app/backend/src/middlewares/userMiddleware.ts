import { NextFunction, Request, Response } from 'express';
import { UserInterface } from '../interfaces/userInterface';

const properties = ['email', 'password'];

function validateProperties(user: UserInterface): [boolean, string | null] {
  for (let i = 0; i < properties.length; i += 1) {
    if (!Object.prototype.hasOwnProperty.call(user, properties[i])) {
      return [false, properties[i]];
    }
  }
  return [true, null];
}

function validateValues(user: UserInterface): [boolean, string | null] {
  const entries = Object.entries(user);
  for (let i = 0; i < entries.length; i += 1) {
    const [property, value] = entries[i];
    if (!value) {
      return [false, property];
    }
  }
  return [true, null];
}

function validationUser(req: Request, res: Response, next: NextFunction) {
  const user: UserInterface = req.body;

  let [valid] = validateProperties(user);

  if (!valid) {
    return res.status(400).send({ message: 'All fields must be filled' });
  }

  [valid] = validateValues(user);

  if (!valid) {
    return res.status(400).send({ message: 'All fields must be filled' });
  }

  next();
}

export default validationUser;
