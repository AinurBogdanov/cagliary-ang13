import { cartProduct } from './product';

export interface Order {
  orderId: string;
  items: cartProduct[];
  promoDrink: 'Cola';
}
