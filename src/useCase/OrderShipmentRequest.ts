class OrderShipmentId {
  constructor(public readonly orderID: number){ }
}
class OrderShipmentRequest {
  constructor(private orderId: OrderShipmentId){}

  public getOrderId(): OrderShipmentId {
      return this.orderId;
  }
}

export  {OrderShipmentRequest, OrderShipmentId}
