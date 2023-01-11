import { Router } from 'express';
import UserController from '../controllers/user.controller';
import userMiddleware from '../middlewares/user.middleware';
import validateUserMiddleware from '../middlewares/validateUser.middleware';

const router = Router();

const productController = new UserController();

router.post(
  '/users',
  userMiddleware,
  validateUserMiddleware,
  productController.create,
);

export default router;
