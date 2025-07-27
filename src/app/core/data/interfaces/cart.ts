import { Drink } from '../enums/drinks';
import { cartProduct } from './cartProduct';
import { Sauce } from './sauce';

export interface Cart {
  products: cartProduct[];
  additionalSauces: Sauce[];
  promo: 'disc10' | Drink | null;
  totalCost: number;
}
