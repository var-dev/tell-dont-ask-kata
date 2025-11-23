import Order from '../../src/domain/Order';
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

  public getById(orderId: number): Order {
      const result = this.orders.find(o => o.getId() == orderId);
      if(!result) throw new Error("Order not found");
      return result;
  }

  public addOrder(order: Order): void {
      this.orders.push(order);
  }
}

export default TestOrderRepository;

