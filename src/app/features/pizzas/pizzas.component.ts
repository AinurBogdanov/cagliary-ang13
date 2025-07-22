import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/core/data/interfaces/fakeApi';
import { CartService } from '../../core/services/cart.service';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-pizza',
  templateUrl: './pizzas.component.html',
  styleUrls: ['./pizzas.component.scss'],
})
export class PizzaComponent implements OnInit {
  products!: Product[][];

  constructor(
    private cartService: CartService,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.products = this.apiService.products;
  }

  addToCart(pizza: Product) {
    this.cartService.addPizza(pizza, -1);
  }
}
