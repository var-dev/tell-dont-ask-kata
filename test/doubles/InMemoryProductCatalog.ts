import Product from '../../src/domain/Product';
import { ProductCatalog } from '../../src/repository/ProductCatalog';
import UnknownProductException from '../../src/useCase/UnknownProductException';
class InMemoryProductCatalog implements ProductCatalog {
  private products: Product[];

  public constructor(products: Product[]) {
    this.products = products;
  }

  public getByName(name: string): Product {
    const result = this.products.find(p => p.getName() === name);
    if (!result) throw new UnknownProductException('Product not found');
    return result
  }
}

export default InMemoryProductCatalog;

