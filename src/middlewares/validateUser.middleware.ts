import { NextFunction, Request, Response } from 'express';
import User from '../interfaces/user.interface';

function productRequired(req: Request, res: Response, next: NextFunction) {
  const user: User = req.body;

  if (typeof user.level !== 'number') {
    return res.status(422).json({ message: '"level" must be a number' });
  }

  if (user.level < 1) {
    return res.status(422).json(
      { message: '"level" must be greater than or equal to 1' },
    );
  }

  if (user.password.length < 8) {
    return res.status(422).json(
      { message: '"password" length must be at least 8 characters long' },
    );
  }

  next();
}

export default productRequired;