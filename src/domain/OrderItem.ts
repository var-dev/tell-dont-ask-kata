import Product from './Product';

class OrderItem {
  //@ts-ignore
  private product: Product;
  //@ts-ignore
  private quantity: number;
  //@ts-ignore
  private taxedAmount: number;
  //@ts-ignore
  private tax: number;

  public getProduct(): Product {
    return this.product;
  }

  public setProduct(product: Product): void {
    this.product = product;
  }

  public getQuantity(): number {
      return this.quantity;
  }

  public setQuantity(quantity: number): void {
    this.quantity = quantity;
  }

  public getTaxedAmount(): number {
    return this.taxedAmount;
  }

  public setTaxedAmount(taxedAmount: number): void {
    this.taxedAmount = taxedAmount;
  }

  public getTax(): number {
    return this.tax;
  }

  public setTax(tax: number): void {
    this.tax = tax;
  }
}

export default OrderItem;

