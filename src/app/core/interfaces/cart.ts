import type { Drink } from './drinks';
import type { cartProduct } from './product';
import type { Sauce } from './sauce';

export interface Cart {
  products: cartProduct[];
  additionalSauces: Sauce[];
  promo: 'disc10' | Drink | null;
  totalCost: number;
}
