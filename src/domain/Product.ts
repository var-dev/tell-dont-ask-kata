import Category from './Category';

class Product {
  //@ts-ignore
  private name: string;
  //@ts-ignore
  private price: number;
  //@ts-ignore
  private category: Category;

  public getName(): string {
    return this.name;
  }

  public setName(name: string): void {
    this.name = name;
  }

  public getPrice(): number {
    return this.price;
  }

  public setPrice(price: number): void {
    this.price = price;
  }

  public getCategory(): Category {
    return this.category;
  }

  public setCategory(category: Category): void {
    this.category = category;
  }

  public calculateUnitaryTax(): number {
    return Math.round(this.price / 100 * this.category.getTaxPercentage() * 100) / 100
  }
  public calculateUnitaryTaxedAmount():number {
    return Math.round((this.price + this.calculateUnitaryTax()) * 100) / 100;
  }

}

export default Product;

