import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { cartProduct } from '../data/interfaces/cartProduct';
import { doughType, Product, size } from '../data/interfaces/product';
import { Cart } from '../data/interfaces/cart';
import { pagesData } from '../data/pages';
import { ApiService } from './api.service';
import { Drink } from '../data/enums/drinks';
import { LocalStorageService } from './local-storage.service';
import { sauces } from '../data/backData/sauces-data';

@Injectable({
  providedIn: 'root',
})
export class CartService implements OnInit {
  private readonly defaultCart: Cart = {
    products: [],
    additionalSaucesIds: [],
    promo: Drink.cola,
    totalCost: 0,
  };
  private cart!: Cart;
  private cart$!: BehaviorSubject<Cart>;
  private pagesData = pagesData;
  private sauces = sauces;

  constructor(
    private apiService: ApiService,
    private localStorageService: LocalStorageService
  ) {
    const storedCart = this.localStorageService.getCartFromStorage();
    const initialCart = storedCart ? storedCart : this.defaultCart;

    this.cart$ = new BehaviorSubject<Cart>(initialCart);
  }

  ngOnInit(): void {
    const result = this.localStorageService.getCartFromStorage();
    if (result) this.cart = result;
  }
  getCart(): Observable<Cart> {
    return this.cart$.asObservable();
  }

  addPizza(pizzaOrId: string | Product, currentPageIndex: number) {
    const currentCart = this.cart$.getValue();
    const currentItems = currentCart.products;

    if (typeof pizzaOrId === 'string') {
      const pizzaId = pizzaOrId;
      const index = this.findIndexById(currentItems, pizzaId);

      if (index > -1) {
        const product = currentItems[index];

        const updatedProduct = {
          ...product,
          sauces: [...product.sauces, this.sauces[7]],
          quantity: product.quantity + 1,
        };

        const updatedProducts = [...currentItems];
        updatedProducts[index] = updatedProduct;

        const updatedCart: Cart = {
          ...currentCart,
          products: updatedProducts,
          totalCost: currentItems.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
          ),
        };
        this.cart$.next(updatedCart);
      }
    } else {
      const pizza = pizzaOrId;
      const cleanPizzaData = this.transformPizzaData(pizza, currentPageIndex);
      const newPizzaId = cleanPizzaData.id;

      const index = this.findIndexById(currentItems, newPizzaId);
      if (index > -1) {
        const product = currentItems[index];
        product.quantity += 1;
        product.sauces.push(this.sauces[7]);

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
      const product = currentItems[index];

      const updatedProduct = {
        ...product,
        saucesIds: product.sauces.slice(1),
        quantity: product.quantity - 1,
      };

      const updatedProducts = [...currentItems];
      updatedProducts[index] = updatedProduct;

      const updatedCart: Cart = {
        ...currentCart,
        products: updatedProducts,
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

  changeProductSauce(productId: string, newSauceIds: number[]) {
    const currentCart = this.cart$.getValue();
    const currentItems = currentCart.products;

    const updatedProducts = currentItems.map((product) => {
      if (product.id === productId) {
        return {
          ...product,
          saucesIds: newSauceIds,
        };
      }
      return product;
    });

    const updatedCart: Cart = {
      ...currentCart,
      products: updatedProducts,
    };
    console.log(updatedCart);
    this.cart$.next(updatedCart);
  }

  sendOrder() {
    // this.apiService.sentOrder();
  }

  private transformPizzaData(
    product: Product,
    currentPageIndex: number
  ): cartProduct {
    const { nutrition, doughTypes, sizes, ...rest } = product;

    const size = this.defineSize(product.sizes);
    const doughType = this.defineDoughType(product.doughTypes);

    const page = this.pagesData.find(
      (page) => page.arrayIndex === currentPageIndex
    );

    return {
      ...rest,
      size,
      doughType,
      sauces: [this.sauces[7]],
      quantity: 1,
      category: page!.category,
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
