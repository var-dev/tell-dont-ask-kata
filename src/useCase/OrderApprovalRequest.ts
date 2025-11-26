import { OrderId } from "../domain/Order";
class OrderApprovalRequest {

  private approved: boolean = false;
  constructor(public readonly orderId: OrderId){}

  public getOrderId(): OrderId {
    return this.orderId;
  }

  public setApproved(approved: boolean): void {
    this.approved = approved;
  }

  public isApproved(): boolean{
    return this.approved;
  }
}

export default OrderApprovalRequest;

