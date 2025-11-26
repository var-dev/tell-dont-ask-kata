import { OrderId } from "../domain/Order";
class OrderShipmentRequest {
  constructor(private orderId: OrderId){}

  public getOrderId(): OrderId {
      return this.orderId;
  }
}

export  {OrderShipmentRequest, OrderId as OrderShipmentId}
