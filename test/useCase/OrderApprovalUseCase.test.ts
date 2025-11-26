import {Order,OrderId} from '../../src/domain/Order';
import { OrderApproved, OrderRejected } from '../../src/domain/OrderStatus';
import ApprovedOrderCannotBeRejectedException from '../../src/useCase/ApprovedOrderCannotBeRejectedException';
import OrderApprovalRequest from '../../src/useCase/OrderApprovalRequest';
import OrderApprovalUseCase from '../../src/useCase/OrderApprovalUseCase';
import RejectedOrderCannotBeApprovedException from '../../src/useCase/RejectedOrderCannotBeApprovedException';
import ShippedOrdersCannotBeChangedException from '../../src/useCase/ShippedOrdersCannotBeChangedException';
import TestOrderRepository from '../doubles/TestOrderRepository';

describe('OrderApprovalUseCase', () => {
  let orderRepository: TestOrderRepository;
  let useCase: OrderApprovalUseCase;

  beforeEach( () => {
    orderRepository = new TestOrderRepository();
    useCase = new OrderApprovalUseCase(orderRepository);
  });
  it('approvedExistingOrder', () => {
    let initialOrder: Order = new Order(new OrderId(1), 'EUR');
    orderRepository.addOrder(initialOrder);

    let request: OrderApprovalRequest = new OrderApprovalRequest(initialOrder.getId());
    request.setApproved(true);

    useCase.run(request);

    const savedOrder: Order = orderRepository.getSavedOrder();
    expect(savedOrder.getStatus().isApproved()).toBe(new OrderApproved().isApproved());
  });

  it('rejectedExistingOrder', () => {
    let initialOrder: Order = new Order(new OrderId(1), 'EUR');
    orderRepository.addOrder(initialOrder);

    let request: OrderApprovalRequest = new OrderApprovalRequest(initialOrder.getId());
    request.setApproved(false);

    useCase.run(request);

    const savedOrder: Order = orderRepository.getSavedOrder();
    expect(savedOrder.getStatus().isRejected()).toBe(new OrderRejected().isRejected());
  });

  it('cannotApproveRejectedOrder', () => {
    const initialOrder: Order = new Order(new OrderId(1), 'EUR');
    let requestToBeRejected: OrderApprovalRequest = new OrderApprovalRequest(initialOrder.getId());
    requestToBeRejected.setApproved(false)
    initialOrder.runApproval(requestToBeRejected)
    
    orderRepository.addOrder(initialOrder);

    const request: OrderApprovalRequest = new OrderApprovalRequest(initialOrder.getId());
    request.setApproved(true);

    expect(() => useCase.run(request)).toThrow(RejectedOrderCannotBeApprovedException);
    expect(orderRepository.getSavedOrder()).toBe(null);
  });

  it('cannotRejectApprovedOrder', () => {
    const initialOrder: Order = new Order(new OrderId(1), 'EUR');
    let requestToBeApproved: OrderApprovalRequest = new OrderApprovalRequest(initialOrder.getId());
    requestToBeApproved.setApproved(true)
    initialOrder.runApproval(requestToBeApproved)
    orderRepository.addOrder(initialOrder);

    const request: OrderApprovalRequest = new OrderApprovalRequest(initialOrder.getId());
    request.setApproved(false);

    expect(() =>  useCase.run(request)).toThrow(ApprovedOrderCannotBeRejectedException);
    expect(orderRepository.getSavedOrder()).toBe(null);
  });

  it('shippedOrdersCannotBeApproved', () => {
    const initialOrder: Order = new Order(new OrderId(1), 'EUR');
    let requestToBeApproved: OrderApprovalRequest = new OrderApprovalRequest(initialOrder.getId());
    requestToBeApproved.setApproved(true)
    initialOrder.runApproval(requestToBeApproved)
    initialOrder.runShipment()
    orderRepository.addOrder(initialOrder);

    const request: OrderApprovalRequest = new OrderApprovalRequest(initialOrder.getId());
    request.setApproved(true);

    expect(() => useCase.run(request)).toThrow(ShippedOrdersCannotBeChangedException);
    expect(orderRepository.getSavedOrder()).toBe(null);
  });

  it('shippedOrdersCannotBeRejected', () => {
    let initialOrder: Order = new Order(new OrderId(1), 'EUR');
    let requestToBeApproved: OrderApprovalRequest = new OrderApprovalRequest(initialOrder.getId());
    requestToBeApproved.setApproved(true)
    initialOrder.runApproval(requestToBeApproved)
    initialOrder.runShipment()
    orderRepository.addOrder(initialOrder);

    let request: OrderApprovalRequest = new OrderApprovalRequest(initialOrder.getId());
    request.setApproved(false);

    expect(() => useCase.run(request)).toThrow(ShippedOrdersCannotBeChangedException);
    expect(orderRepository.getSavedOrder()).toBe(null);
  });
});
