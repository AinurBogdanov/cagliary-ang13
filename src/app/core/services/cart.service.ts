import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cart } from 'src/app/core/interfaces/cart';
import { pagesData } from '../data/pages';
import { Drink } from '../interfaces/drinks';
import { LocalStorageService } from './local-storage.service';
import { sauces } from '../data/sauces-data';
import type {
  cartProduct,
  doughType,
  BackendProduct,
  size,
} from 'src/app/core/interfaces/product';
import type { Sauce } from 'src/app/core/interfaces/sauce';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartSubject: BehaviorSubject<Cart>;
  private cart$: Observable<Cart>;
  private readonly defaultCart: Cart = {
    products: [],
    additionalSauces: [],
    promo: Drink.cola,
    totalCost: 0,
  };
  private sauces = sauces;
  private pagesData = pagesData;

  constructor(private localStorageService: LocalStorageService) {
    const storedCart = this.localStorageService.getCartFromStorage();
    const initialCart = storedCart ? storedCart : this.defaultCart;

    this.cartSubject = new BehaviorSubject<Cart>(initialCart);
    this.cart$ = this.cartSubject.asObservable();
    this.cart$.subscribe((cart) => {
      if (cart) {
        this.localStorageService.saveCart(cart);
      }
    });
  }

  getCart(): Observable<Cart> {
    return this.cartSubject.asObservable();
  }

  addPizza(pizzaOrId: string | BackendProduct, currentPageIndex: number): void {
    const currentCart: Cart = this.cartSubject.getValue();
    const currentItems = currentCart.products;

    if (typeof pizzaOrId === 'string') {
      const pizzaId = pizzaOrId;

      const index = this.findIndexById(currentItems, pizzaId);

      if (index > -1) {
        const updatedProducts = this.updateProductQuantityAndSauces(
          currentItems,
          index
        );
        this.updateCart(updatedProducts, currentCart);
      }
    } else {
      const pizza = pizzaOrId;
      const cleanPizzaData = this.transformPizzaData(pizza, currentPageIndex);

      const newPizzaId = cleanPizzaData.id;
      const index = this.findIndexById(currentItems, newPizzaId);

      if (index > -1) {
        const updatedProducts = this.updateProductQuantityAndSauces(
          currentItems,
          index
        );
        this.updateCart(updatedProducts, currentCart);
      } else {
        const updatedProducts = [...currentItems, cleanPizzaData];

        this.updateCart(updatedProducts, currentCart);
      }
    }
  }

  deleteFromCart(item: cartProduct) {
    const currentCart = this.cartSubject.getValue();
    const currentItems = currentCart.products;

    const index = this.findIndexById(currentItems, item.id);
    currentItems.splice(index, 1);

    const updatedCart: Cart = {
      ...currentCart,
      products: [...currentItems],
      totalCost: this.calcItemsCost(currentItems),
    };

    this.cartSubject.next(updatedCart);
  }

  minusOne(item: cartProduct) {
    const currentCart = this.cartSubject.getValue();
    const currentItems = currentCart.products;

    const index = this.findIndexById(currentItems, item.id);

    const itemFromCart = currentItems[index];
    if (itemFromCart.quantity > 1) {
      const product = currentItems[index];

      const updatedProduct = {
        ...product,
        sauces: this.removeSauce(product.sauces),
        quantity: product.quantity - 1,
      };

      const updatedProducts = [...currentItems];
      updatedProducts[index] = updatedProduct;

      const updatedCart: Cart = {
        ...currentCart,
        products: updatedProducts,
        totalCost: this.calcItemsCost(currentItems),
      };
      this.cartSubject.next(updatedCart);
    } else {
      currentItems.splice(index, 1);

      const updatedCart: Cart = {
        ...currentCart,
        products: [...currentItems],
        totalCost: this.calcItemsCost(currentItems),
      };
      this.cartSubject.next(updatedCart);
    }
  }

  changeProductSauce(productId: string, sauces: Sauce[]) {
    const currentCart = this.cartSubject.getValue();
    const currentItems = currentCart.products;

    const updatedProducts = currentItems.map((product) => {
      if (product.id === productId) {
        return {
          ...product,
          sauces: sauces,
        };
      }
      return product;
    });

    const updatedCart: Cart = {
      ...currentCart,
      products: updatedProducts,
    };
    this.cartSubject.next(updatedCart);
  }

  sendOrder() {
    // this.apiService.sentOrder();
  }

  private addSauce(sauceArray: Sauce[]): Sauce[] {
    const saucesCopy = [...sauceArray];
    const newSauce = this.sauces[7];
    const existingIndex = saucesCopy.findIndex((s) => s.id === newSauce.id);

    if (existingIndex !== -1) {
      saucesCopy[existingIndex] = {
        ...saucesCopy[existingIndex],
        count: saucesCopy[existingIndex].count + 1,
      };
    } else {
      saucesCopy.push({ ...newSauce, count: 1 });
    }
    return saucesCopy;
  }

  private removeSauce(sauces: Sauce[]) {
    let sauceRemove = 1;

    return sauces.map((sauce) => {
      if (sauceRemove === 1) {
        if (sauce.count === 1) {
          sauceRemove -= 1;
          return { ...sauce, count: 0 };
        }
        if (sauce.count > 1) {
          sauceRemove -= 1;
          return { ...sauce, count: sauce.count - 1 };
        }
      }
      return sauce;
    });
  }

  private transformPizzaData(
    product: BackendProduct,
    currentPageIndex: number
  ): cartProduct {
    const { nutrition, doughTypes, sizes, ...rest } = product;

    const size = this.defineSize(product.sizes);
    const doughType = this.defineDoughType(product.doughTypes);

    const page = this.pagesData.find(
      (page) => page.arrayIndex === currentPageIndex
    );

    const sauce = { ...this.sauces[7], count: 1 };

    return {
      ...rest,
      size,
      doughType,
      sauces: [sauce],
      quantity: 1,
      category: page!.category,
    };
  }

  additionalSauceChange(newSauce: Sauce, increment: number) {
    const cart = this.cartSubject.value;
    const existingSauceIndex = cart.additionalSauces.findIndex(
      (s) => s.id === newSauce.id
    );

    if (existingSauceIndex !== -1) {
      cart.additionalSauces = cart.additionalSauces.map((sauce) =>
        sauce.id === newSauce.id
          ? { ...sauce, count: sauce.count + increment }
          : sauce
      );
    } else {
      cart.additionalSauces.push({ ...newSauce, count: increment });
    }

    cart.additionalSauces = cart.additionalSauces.filter((s) => s.count > 0);

    this.cartSubject.next(cart);
  }

  private updateProductQuantityAndSauces(
    items: cartProduct[],
    index: number
  ): cartProduct[] {
    const product = items[index];
    const updatedProduct: cartProduct = {
      ...product,
      sauces: this.addSauce(product.sauces),
      quantity: product.quantity + 1,
    };

    const updatedProducts = [...items];
    updatedProducts[index] = updatedProduct;
    return updatedProducts;
  }

  private updateCart(updatedProducts: cartProduct[], currentCart: Cart) {
    const updatedCart = {
      ...currentCart,
      products: updatedProducts,
      totalCost: this.calcItemsCost(updatedProducts),
    };

    this.cartSubject.next(updatedCart);
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
  private findIndexById(array: BackendProduct[] | cartProduct[], id: string) {
    return array.findIndex((item) => item.id === id);
  }
  private calcItemsCost(items: cartProduct[]) {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }
}
