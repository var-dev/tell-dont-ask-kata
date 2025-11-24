import OrderApprovalRequest from '../useCase/OrderApprovalRequest';
import OrderItem from './OrderItem';
import { OrderCreated, OrderStatus } from './OrderStatus';

class Order {
  //@ts-ignore
  private total: number;
  //@ts-ignore
  private currency: string;
  //@ts-ignore
  private items: OrderItem[];
  //@ts-ignore
  private tax: number;
  //@ts-ignore
  private status: OrderStatus;
  //@ts-ignore
  private id: number;

  constructor (){
    this.status = new OrderCreated();
  }

  public getTotal(): number {
      return this.total;
  }

  public setTotal(total: number): void  {
      this.total = total;
  }

  public getCurrency(): string {
      return this.currency;
  }

  public setCurrency(currency: string): void {
      this.currency = currency;
  }

  public getItems(): OrderItem[] {
      return this.items;
  }

  public setItems(items: OrderItem[]): void {
      this.items = items;
  }

  public getTax(): number {
      return this.tax;
  }

  public setTax(tax: number): void {
      this.tax = tax;
  }

  public getStatus(): OrderStatus {
      return this.status;
  }

  public getId(): number {
      return this.id;
  }

  public setId(id: number): void {
      this.id = id;
  }
  public runApproval(request: OrderApprovalRequest): void {
    this.status = this.status.runApproval(request)
  }
  public runShipment(): void {
    this.status = this.status.runShipment()
  }
}

export default Order;

