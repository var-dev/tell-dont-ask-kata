import ApprovedOrderCannotBeRejectedException from "../useCase/ApprovedOrderCannotBeRejectedException";
import OrderApprovalRequest from "../useCase/OrderApprovalRequest";
import OrderCannotBeShippedException from "../useCase/OrderCannotBeShippedException";
import OrderCannotBeShippedTwiceException from "../useCase/OrderCannotBeShippedTwiceException";
import RejectedOrderCannotBeApprovedException from "../useCase/RejectedOrderCannotBeApprovedException";
import ShippedOrdersCannotBeChangedException from "../useCase/ShippedOrdersCannotBeChangedException";

export interface OrderStatus {
  isApproved(): boolean;
  isRejected(): boolean;
  isShipped(): boolean;
  isCreated(): boolean;
  runApproval(request: OrderApprovalRequest): OrderStatus;
  runShipment(): OrderStatus
}

export class OrderApproved implements OrderStatus {
  isApproved(): boolean {return true;}
  isRejected(): boolean {return false;}
  isShipped(): boolean {return false;}
  isCreated(): boolean {return false;}
  public runApproval(request: OrderApprovalRequest): OrderStatus  {
    if (!request.isApproved()) {
      throw new ApprovedOrderCannotBeRejectedException();
    }
    return this;
  }
  public runShipment(): OrderStatus {
    return  new OrderShipped();
  }
}

export class OrderRejected implements OrderStatus {
  isApproved(): boolean {return false;}
  isRejected(): boolean {return true;}
  isShipped(): boolean {return false;}
  isCreated(): boolean {return false;}
  public runApproval(request: OrderApprovalRequest): OrderStatus  {
    throw new RejectedOrderCannotBeApprovedException();
  }
  public runShipment(): OrderStatus {
    throw new OrderCannotBeShippedException();
  }
}

export class OrderShipped implements OrderStatus {
  isApproved(): boolean {return false;}
  isRejected(): boolean {return false;}
  isShipped(): boolean {return true;}
  isCreated(): boolean {return false;}
  public runApproval(request: OrderApprovalRequest): OrderStatus  { 
    throw new ShippedOrdersCannotBeChangedException(); 
  }
  public runShipment(): OrderStatus {
    throw new OrderCannotBeShippedTwiceException();
  }
}

export class OrderCreated implements OrderStatus {
  isApproved(): boolean {return false;}
  isRejected(): boolean {return false;}
  isShipped(): boolean {return false;}
  isCreated(): boolean {return true;}
  public runApproval(request: OrderApprovalRequest): OrderStatus  {
    if (request.isApproved()) {
      return new OrderApproved()
    }
    return new OrderRejected()
  }
  public runShipment(): OrderStatus {
    throw new OrderCannotBeShippedException();
  }
}

