import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import UserService from '../services/user.service';

class UserController {
  constructor(private userService = new UserService()) { }
    
  public create = async (req: Request, res: Response) => {
    const product = req.body;
    const secret = 'trybe';
    
    const productCreated = await this.userService.create(product);
    const token = jwt.sign({ data: productCreated }, secret);
    res.status(201).json({ token });
  };
}

export default UserController;