import { Router } from 'express';
import ProductController from '../controllers/product.controller';
import productRequired from '../middlewares/product.middleware';

const router = Router();

const productController = new ProductController();

router.get('/products', productController.getAll);

router.post(
  '/products',
  productRequired,
  productController.create,
);

export default router;
