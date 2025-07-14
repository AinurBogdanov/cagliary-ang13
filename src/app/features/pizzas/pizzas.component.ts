import { Component, OnInit } from '@angular/core';
import { fakeApiResp } from 'src/app/core/data/pizzas';
import { Product } from 'src/app/core/interfaces/fakeApi';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-pizza',
  templateUrl: './pizzas.component.html',
  styleUrls: ['./pizzas.component.scss'],
})
export class PizzaComponent {
  products: Product[] = fakeApiResp.products;

  constructor(private cartService: CartService) {}

  addToCart(pizza: Product) {
    this.cartService.addPizza(pizza);
  }
}
