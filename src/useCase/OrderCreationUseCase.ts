import {Order} from '../domain/Order';
import OrderRepository from '../repository/OrderRepository';
import { ProductCatalog } from '../repository/ProductCatalog';
import SellItemsRequest from './SellItemsRequest';

class OrderCreationUseCase {
  private readonly orderRepository: OrderRepository;
  private readonly productCatalog: ProductCatalog;

  public constructor(orderRepository: OrderRepository, productCatalog: ProductCatalog) {
    this.orderRepository = orderRepository;
    this.productCatalog = productCatalog;
  }

  public run(request: SellItemsRequest, order: Order): void {
    order.runSellItemsRequest(request, this.productCatalog);
    this.orderRepository.save(order);
  }
}

export default OrderCreationUseCase;

