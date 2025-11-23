import Order from '../domain/Order';
import { OrderShipped } from '../domain/OrderStatus';
import OrderRepository from '../repository/OrderRepository';
import { ShipmentService } from '../service/ShipmentService';
import OrderCannotBeShippedException from './OrderCannotBeShippedException';
import OrderCannotBeShippedTwiceException from './OrderCannotBeShippedTwiceException';
import OrderShipmentRequest from './OrderShipmentRequest';

class OrderShipmentUseCase {
  private readonly orderRepository: OrderRepository;
  private readonly shipmentService: ShipmentService;

  public constructor (orderRepository: OrderRepository, shipmentService: ShipmentService) {
    this.orderRepository = orderRepository;
    this.shipmentService = shipmentService;
  }

  public run(request: OrderShipmentRequest): void {
    const order: Order = this.orderRepository.getById(request.getOrderId());

    if (order.getStatus().isCreated() || order.getStatus().isRejected()) {
      throw new OrderCannotBeShippedException();
    }

    if (order.getStatus().isShipped()) {
      throw new OrderCannotBeShippedTwiceException();
    }

    this.shipmentService.ship(order);

    order.setStatus(new OrderShipped());
    this.orderRepository.save(order);
  }
}

export default OrderShipmentUseCase;
