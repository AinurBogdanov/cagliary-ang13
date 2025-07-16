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
      const index = currentItems.findIndex((item) => item.id === pizzaId);

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

      const costUpdated =
        currentCart.totalCost + cleanPizzaData.price * cleanPizzaData.quantity;

      const updatedCart: Cart = {
        ...currentCart,
        products: [...currentItems, cleanPizzaData],
        totalCost: costUpdated,
      };
      this.cart$.next(updatedCart);
    }
  }

  removePizza() {}

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
}
