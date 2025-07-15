import { Product } from './product';

export interface fakeApi {
  timestamp: string;
  productsCount: number;
  products: Product[];
}
export { Product };
