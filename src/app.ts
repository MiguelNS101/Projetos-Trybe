import express from 'express';
import productRoutes from './routes/product.route';
import userRoutes from './routes/user.route';
import orderRoutes from './routes/order.route';

const app = express();

app.use(express.json());

app.use(productRoutes);
app.use(userRoutes);
app.use(orderRoutes);

export default app;
