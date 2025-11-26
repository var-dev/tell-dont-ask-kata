import Product from './Product';

class OrderItem {
  private taxedAmount: number;
  private tax: number;

  constructor (private product: Product, private quantity: number){
    this.tax = this.calculateTax()
    this.taxedAmount = this.calculateTaxedAmount()
  }

  public getProduct(): Product {
    return this.product;
  }

  public getQuantity(): number {
      return this.quantity;
  }

  public getTaxedAmount(): number {
    return this.taxedAmount;
  }

  public getTax(): number {
    return this.tax;
  }

  private calculateTax(){
    return this.product.calculateUnitaryTax() * this.quantity
  }
  private calculateTaxedAmount(){
    return  Math.round(this.product.calculateUnitaryTaxedAmount() * this.quantity * 100) / 100
  }
}

export default OrderItem;

