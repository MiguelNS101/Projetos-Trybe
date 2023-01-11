import { Request, Response, NextFunction } from 'express';
import HandleJWT from '../funcs/handleJWT';

const validateToken = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  const token = authorization as string;
  const jwt = new HandleJWT();
  if (!jwt.verifyToken(token)) {
    return res.status(401).send({ message: 'Token must be a valid token' });
  }
  next();
};

export default validateToken;
