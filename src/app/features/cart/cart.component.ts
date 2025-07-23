import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { map, Observable } from 'rxjs';
import { cartProduct } from 'src/app/core/data/interfaces/cartProduct';
import { Cart } from 'src/app/core/data/interfaces/cart';
import { LocalStorageService } from '../../core/services/local-storage.service';

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
}
