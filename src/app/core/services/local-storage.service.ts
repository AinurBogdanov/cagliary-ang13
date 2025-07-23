import { Injectable } from '@angular/core';
import { Cart } from '../data/interfaces/cart';
import { stringify } from 'querystring';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private readonly cartStorageKey = 'Cart';

  constructor() {}

  saveCart(cart: Cart) {
    console.log('cart saved');
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
