import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartComponent {
  cartItems$ = this.cartService.getCartProducts();

  constructor(private cartService: CartService) {}

  addPizza(id: string) {
    this.cartService.addPizza(id);
  }
}
