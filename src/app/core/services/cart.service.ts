import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { cartProduct } from '../data/interfaces/cartProduct';
import { cart } from '../data/cart';
import { doughType, Product, size } from '../data/interfaces/product';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems$ = new BehaviorSubject<cartProduct[]>(cart.products);

  getCartProducts(): Observable<cartProduct[]> {
    return this.cartItems$.asObservable();
  }

  addPizza(pizzaOrId: string | Product) {
    const items = this.cartItems$.getValue();

    if (typeof pizzaOrId === 'string') {
      const pizzaId = pizzaOrId;
      const index = items.findIndex((item) => item.id === pizzaId);

      if (index > -1) {
        items[index].quantity += 1;
      }
    } else {
      const pizza = pizzaOrId;
      const cleanPizzaData = this.transformPizzaData(pizza);

      items.push(cleanPizzaData);
    }

    this.cartItems$.next([...items]);
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
}
