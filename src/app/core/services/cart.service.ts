import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { cartProduct } from '../data/interfaces/cartProduct';
import { cart } from '../data/cart';
import { doughType, Product, size } from '../data/interfaces/product';
import { Cart } from '../data/interfaces/cart';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cart$ = new BehaviorSubject<Cart>(cart);

  getCart(): Observable<Cart> {
    return this.cart$.asObservable();
  }

  addPizza(pizzaOrId: string | Product) {
    const currentCart = this.cart$.getValue();
    const currentItems = currentCart.products;

    if (typeof pizzaOrId === 'string') {
      const pizzaId = pizzaOrId;
      const index = this.findIndexById(currentItems, pizzaId);

      if (index > -1) {
        currentItems[index].quantity += 1;

        const updatedCart: Cart = {
          ...currentCart,
          products: [...currentItems],
          totalCost: currentItems.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
          ),
        };
        this.cart$.next(updatedCart);
      }
    } else {
      const pizza = pizzaOrId;
      const cleanPizzaData = this.transformPizzaData(pizza);
      const newPizzaId = cleanPizzaData.id;

      const index = this.findIndexById(currentItems, newPizzaId);
      if (index > -1) {
        currentItems[index].quantity += 1;

        const updatedCart: Cart = {
          ...currentCart,
          products: [...currentItems],
          totalCost: this.calcItemsCost(currentItems),
        };
        this.cart$.next(updatedCart);
      } else {
        const updatedItems = [...currentItems, cleanPizzaData];
        const updatedCart: Cart = {
          ...currentCart,
          products: updatedItems,
          totalCost: this.calcItemsCost(updatedItems),
        };
        this.cart$.next(updatedCart);
      }
    }
  }

  deleteFromCart(item: cartProduct) {
    const currentCart = this.cart$.getValue();
    const currentItems = currentCart.products;

    const index = this.findIndexById(currentItems, item.id);
    currentItems.splice(index, 1);

    const updatedCart: Cart = {
      ...currentCart,
      products: [...currentItems],
      totalCost: this.calcItemsCost(currentItems),
    };

    this.cart$.next(updatedCart);
  }

  minusOne(item: cartProduct) {
    const currentCart = this.cart$.getValue();
    const currentItems = currentCart.products;

    const index = this.findIndexById(currentItems, item.id);

    const itemFromCart = currentItems[index];
    if (itemFromCart.quantity > 1) {
      currentItems[index].quantity -= 1;

      const updatedCart: Cart = {
        ...currentCart,
        products: [...currentItems],
        totalCost: this.calcItemsCost(currentItems),
      };
      this.cart$.next(updatedCart);
    } else {
      currentItems.splice(index, 1);

      const updatedCart: Cart = {
        ...currentCart,
        products: [...currentItems],
        totalCost: this.calcItemsCost(currentItems),
      };
      this.cart$.next(updatedCart);
    }
  }

  private transformPizzaData(product: Product): cartProduct {
    const { nutrition, doughTypes, sizes, ...rest } = product;

    const size = this.defineSize(product.sizes);
    const doughType = this.defineDoughType(product.doughTypes);

    return {
      ...rest,
      size,
      doughType,
      saucesIds: [8],
      quantity: 1,
    };
  }

  private defineSize(sizes: size[]): string {
    const activeSize = sizes.find((size) => size.active === true);
    return !activeSize ? '30 см' : activeSize.size;
  }
  private defineDoughType(doughTypes: doughType[]) {
    const activeDoughType = doughTypes.find(
      (doughType) => doughType.active === true
    );

    return !activeDoughType ? 'Традиционное' : activeDoughType.type;
  }
  private findIndexById(array: cartProduct[], id: string) {
    return array.findIndex((item) => item.id === id);
  }
  private calcItemsCost(items: cartProduct[]) {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }
}
