import { Drink } from '../enums/drinks';
import { cartProduct } from './cartProduct';

export interface Cart {
  products: cartProduct[];
  additionalSaucesIds: number[] | null;
  promo: 'disc10' | Drink | null;
  totalCost: number;
}
