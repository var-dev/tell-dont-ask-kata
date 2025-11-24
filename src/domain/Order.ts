import OrderApprovalRequest from '../useCase/OrderApprovalRequest';
import OrderItem from './OrderItem';
import { OrderCreated, OrderStatus } from './OrderStatus';

class Order {
  //@ts-ignore
  private total: number;
  //@ts-ignore
  private items: OrderItem[] = [];
  //@ts-ignore
  private tax: number;
  //@ts-ignore
  private status: OrderStatus;


  constructor ( private id: number = 1,  private currency: string = 'EUR'){
    this.status = new OrderCreated();
  }

  public getTotal(): number {
      return this.total;
  }

  public getCurrency(): string {
      return this.currency;
  }

  public getItems(): OrderItem[] {
      return this.items;
  }

  public getTax(): number {
      return this.tax;
  }

  public getStatus(): OrderStatus {
      return this.status;
  }

  public getId(): number {
      return this.id;
  }

  public runApproval(request: OrderApprovalRequest): void {
    this.status = this.status.runApproval(request)
  }
  public runShipment(): void {
    this.status = this.status.runShipment()
  }
  public addItem(item: OrderItem){
    this.items.push(item);
    this.calculateTax()
    this.calculateTotal()
  }
  public calculateTotal():void {
    this.total = this.items.reduce((sum, currentItem)=> sum + currentItem.getTaxedAmount(),0)
  }
  public calculateTax():void {
    this.tax = this.items.reduce((sum, currentItem)=> sum + currentItem.getTax(),0)
  }
}

export default Order;

