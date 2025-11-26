import {Order,OrderId} from "../../src/domain/Order";
import { OrderShipped } from "../../src/domain/OrderStatus";
import OrderApprovalRequest from "../../src/useCase/OrderApprovalRequest";
import OrderCannotBeShippedException from "../../src/useCase/OrderCannotBeShippedException";
import OrderCannotBeShippedTwiceException from "../../src/useCase/OrderCannotBeShippedTwiceException";
import {OrderShipmentId, OrderShipmentRequest} from "../../src/useCase/OrderShipmentRequest";
import OrderShipmentUseCase from "../../src/useCase/OrderShipmentUseCase";
import TestOrderRepository from "../doubles/TestOrderRepository";
import TestShipmentService from "../doubles/TestShipmentService";

describe('OrderShipmentUseCase', () => {
  let orderRepository: TestOrderRepository;
  let shipmentService: TestShipmentService;
  let useCase: OrderShipmentUseCase;

  beforeEach( () => {
    orderRepository = new TestOrderRepository();
    shipmentService = new TestShipmentService();
    useCase = new OrderShipmentUseCase(orderRepository, shipmentService);
  });
  
  it('shipApprovedOrder', () => {
    let initialOrder: Order = new Order(new OrderId(1), 'EUR');
    let requestToBeApproved: OrderApprovalRequest = new OrderApprovalRequest(initialOrder.getId());
    requestToBeApproved.setApproved(true)
    initialOrder.runApproval(requestToBeApproved)
    orderRepository.addOrder(initialOrder);

    let request: OrderShipmentRequest = new OrderShipmentRequest(new OrderShipmentId(1));

    useCase.run(request);

    expect(orderRepository.getSavedOrder().getStatus().isShipped()).toBe(new OrderShipped().isShipped());
    expect(shipmentService.getShippedOrder()).toBe(initialOrder);
  });

  it('createdOrdersCannotBeShipped', () => {
    let initialOrder: Order = new Order(new OrderId(2), 'EUR');
    orderRepository.addOrder(initialOrder);

    let request: OrderShipmentRequest = new OrderShipmentRequest(new OrderShipmentId(2));

    expect(() => useCase.run(request)).toThrow(OrderCannotBeShippedException);
    expect(orderRepository.getSavedOrder()).toBe(null);
    expect(shipmentService.getShippedOrder()).toBe(null);
  });

  it('rejectedOrdersCannotBeShipped', () => {
    let initialOrder: Order = new Order(new OrderId(3), 'EUR');
    let requestToBeRejected: OrderApprovalRequest = new OrderApprovalRequest(initialOrder.getId());
    requestToBeRejected.setApproved(false)
    initialOrder.runApproval(requestToBeRejected)
    orderRepository.addOrder(initialOrder);

    let request: OrderShipmentRequest = new OrderShipmentRequest(new OrderShipmentId(3));

    expect(() => useCase.run(request)).toThrow(OrderCannotBeShippedException);
    expect(orderRepository.getSavedOrder()).toBe(null);
    expect(shipmentService.getShippedOrder()).toBe(null);
  });

  it('shippedOrdersCannotBeShippedAgain', () => {
    let initialOrder: Order = new Order(new OrderId(4), 'EUR');
    let requestToBeApproved: OrderApprovalRequest = new OrderApprovalRequest(initialOrder.getId());
    requestToBeApproved.setApproved(true)
    initialOrder.runApproval(requestToBeApproved)
    initialOrder.runShipment()
    orderRepository.addOrder(initialOrder);

    let request: OrderShipmentRequest = new OrderShipmentRequest(new OrderShipmentId(4));

    expect(() => useCase.run(request)).toThrow(OrderCannotBeShippedTwiceException);
    expect(orderRepository.getSavedOrder()).toBe(null);
    expect(shipmentService.getShippedOrder()).toBe(null);
  });
});
