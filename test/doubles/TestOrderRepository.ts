import {Order, OrderId} from '../../src/domain/Order';
import OrderRepository from '../../src/repository/OrderRepository';

class TestOrderRepository implements OrderRepository {
  //@ts-ignore
  private insertedOrder: Order = null;
  private orders: Order[] = [];

  public getSavedOrder(): Order {
      return this.insertedOrder;
  }

  public save(order: Order): void {
      this.insertedOrder = order;
  }

  public getByNumber(orderIdNumber: number): Order {
      const result = this.orders.find(o => o.getId().id === orderIdNumber);
      if(!result) throw new Error("Order not found");
      return result;
  }
  public getById(orderId: OrderId): Order {
      const result = this.orders.find(o => o.getId().id === orderId.id);
      if(!result) throw new Error("Order not found");
      return result;
  }

  public addOrder(order: Order): void {
      this.orders.push(order);
  }
}

export default TestOrderRepository;

