import { Request, Response, NextFunction } from 'express';
import UserService from '../services/userService';

export default class Controller {
  public uService = new UserService();

  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { password, email } = req.body;
      const token = await this.uService.login({ password, email });
      if (!token) {
        return res.status(401).send({ message: 'Incorrect email or password' });
      }
      return res.status(200).json({ token });
    } catch (error) {
      next(error);
    }
  };

  validate = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { authorization } = req.headers;
      const token = authorization as string;
      const role = await this.uService.validate(token);
      if (!role) {
        return res.status(401).send({ message: 'Token must be valid' });
      }
      return res.status(200).json(role);
    } catch (error) {
      next(error);
    }
  };
}
