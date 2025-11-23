export interface OrderStatus {
  isApproved(): boolean;
  isRejected(): boolean;
  isShipped(): boolean;
  isCreated(): boolean;
}

export class OrderApproved implements OrderStatus {
  isApproved(): boolean {return true;}
  isRejected(): boolean {return false;}
  isShipped(): boolean {return false;}
  isCreated(): boolean {return false;}
}

export class OrderRejected implements OrderStatus {
  isApproved(): boolean {return false;}
  isRejected(): boolean {return true;}
  isShipped(): boolean {return false;}
  isCreated(): boolean {return false;}
}

export class OrderShipped implements OrderStatus {
  isApproved(): boolean {return false;}
  isRejected(): boolean {return false;}
  isShipped(): boolean {return true;}
  isCreated(): boolean {return false;}
}

export class OrderCreated implements OrderStatus {
  isApproved(): boolean {return false;}
  isRejected(): boolean {return false;}
  isShipped(): boolean {return false;}
  isCreated(): boolean {return true;}
}

