import {Order,OrderId} from '../domain/Order';

interface OrderRepository {
  save(order: Order): void;
  getByNumber(orderIdNumber: number): Order;
  getById(orderId: OrderId): Order;
}

export default OrderRepository;
