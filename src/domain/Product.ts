import Category from './Category';

class Product {
  constructor(private name: string, private price: number, private category: Category){}

  public getName(): string {
    return this.name;
  }
  public getPrice(): number {
    return this.price;
  }
  public getCategory(): Category {
    return this.category;
  }
  public calculateUnitaryTax(): number {
    return Math.round(this.price / 100 * this.category.getTaxPercentage() * 100) / 100
  }
  public calculateUnitaryTaxedAmount():number {
    return Math.round((this.price + this.calculateUnitaryTax()) * 100) / 100;
  }
}

export default Product;

