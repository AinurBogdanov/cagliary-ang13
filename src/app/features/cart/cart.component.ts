import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { map } from 'rxjs';
import { cartProduct } from 'src/app/core/data/interfaces/cartProduct';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartComponent {
  items$ = this.cartService
    .getCart()
    .pipe(map((cart) => (cart ? cart.products : [])));

  constructor(private cartService: CartService) {}

  addPizza(id: string) {
    this.cartService.addPizza(id);
  }
  deleteFromCart(item: cartProduct) {
    this.cartService.deleteFromCart(item);
  }
}
