import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { LocalStorageService } from '../../core/services/local-storage.service';
import { sauces } from '../../core/data/sauces-data';
import type { Cart } from 'src/app/core/interfaces/cart';
import type { Sauce } from 'src/app/core/interfaces/sauce';
import type { cartProduct } from 'src/app/core/interfaces/product';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartComponent implements OnInit {
  items$ = this.cartService
    .getCart()
    .pipe(map((cart) => (cart ? cart.products : [])));
  cart$: Observable<Cart> = this.cartService.getCart();
  totalCost$ = this.cart$.pipe(
    map((cart: Cart) => {
      return cart ? cart.totalCost : 0;
    })
  );
  modalVisibleSubject = new BehaviorSubject<boolean>(false);
  visibleForProductSubject = new BehaviorSubject('');

  modalVisible$ = this.modalVisibleSubject.asObservable();
  visibleForProduct$ = this.visibleForProductSubject.asObservable();

  constructor(
    private cartService: CartService,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.cart$.subscribe((cart) => {
      this.localStorageService.saveCart(cart);
    });
  }

  addPizza(id: string) {
    this.cartService.addPizza(id, -1);
  }
  deleteItem(item: cartProduct) {
    this.cartService.deleteFromCart(item);
  }
  minusOneItem(item: cartProduct) {
    this.cartService.minusOne(item);
  }
  toggleSauceModal(productId?: string) {
    if (productId) {
      this.visibleForProductSubject.next(productId);
    } else {
      this.visibleForProductSubject.next('');
    }
    this.modalVisibleSubject.next(!this.modalVisibleSubject.value);
  }
  selectSauce(sauces: Sauce[]) {
    const productId = this.visibleForProductSubject.getValue();
    this.cartService.changeProductSauce(productId, sauces);
  }

  additionalSauceChange(sauceAndIncrement: {
    sauce: Sauce;
    increment: number;
  }) {
    this.cartService.additionalSauceChange(
      sauceAndIncrement.sauce,
      sauceAndIncrement.increment
    );
  }
  addProduct(productId: string) {
    this.cartService.addPizza(productId, -1);
  }
}
