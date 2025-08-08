import { Injectable } from '@angular/core';
import type { Cart } from 'src/app/core/interfaces/cart';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private readonly cartStorageKey = 'Cart';

  constructor() {}

  saveCart(cart: Cart) {
    localStorage.setItem(this.cartStorageKey, JSON.stringify(cart));
  }
  getCartFromStorage() {
    const result = localStorage.getItem(this.cartStorageKey);
    if (result) {
      return JSON.parse(result);
    }
    return null;
  }
}
