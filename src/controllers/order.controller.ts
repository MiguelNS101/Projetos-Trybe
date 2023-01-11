import { Request, Response } from 'express';
import OrderService from '../services/order.service';

class OrderController {
  constructor(private orderService = new OrderService()) {}

  public getAll = async (_req: Request, res: Response) => {
    const orders = await this.orderService.getAll();
    const formatOrders = orders.map((o) => ({
      id: o.id,
      userId: o.userId,
      productsIds: [o.products],
    }));
    res.status(200).json(formatOrders);
  };
}

export default OrderController;
