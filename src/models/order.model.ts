import { Pool } from 'mysql2/promise';
import Order from '../interfaces/order.interface';

export default class OrderModel {
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async getAll(): Promise<Order[]> {
    const result = await this.connection
      .execute(`
      SELECT o.id, o.userId, p.id AS products 
      FROM Trybesmith.Orders AS o
      INNER JOIN Trybesmith.Products AS p 
      ON p.orderId = o.id`);
    const [rows] = result;
    return rows as Order[];
  }
}