import { Component } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { cart } from 'src/app/core/data/cart';
import { cartProduct } from 'src/app/core/interfaces/cartProduct';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent {
  cart$ = this.cartService.getCart();

  constructor(private cartService: CartService) {}

  addPizza(id: string) {
    this.cartService.addPizza(id);
  }
}
