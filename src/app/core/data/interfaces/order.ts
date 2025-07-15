import { Product } from './product';

export interface Order {
  orderId: string;
  items: Product[];
  promoDrink: 'Cola';
}
