import { ProductCatalog } from '../repository/ProductCatalog';
import OrderApprovalRequest from '../useCase/OrderApprovalRequest';
import SellItemsRequest from '../useCase/SellItemsRequest';
import OrderItem from './OrderItem';
import { OrderCreated, OrderStatus } from './OrderStatus';
import Product from './Product';

class Order {
  //@ts-ignore
  private total: number;
  //@ts-ignore
  private items: OrderItem[] = [];
  //@ts-ignore
  private tax: number;
  //@ts-ignore
  private status: OrderStatus;


  constructor ( 
    private id: number = 1,  
    private currency: string = 'EUR',
    
){
    this.status = new OrderCreated();
    return this
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
  public runSellItemsRequest(request: SellItemsRequest, productCatalog: ProductCatalog){
    for (const itemRequest of request.getRequests) {
      const product: Product = productCatalog.getByName(itemRequest.getProductName());
      this.addItem(new OrderItem(product, itemRequest.getQuantity()));
    }
    return this
  }
}

export default Order;

