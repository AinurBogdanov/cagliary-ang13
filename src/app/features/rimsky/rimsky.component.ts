import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/core/data/interfaces/product';
import { ApiService } from 'src/app/core/services/api.service';
import { CartService } from 'src/app/core/services/cart.service';

@Component({
  selector: 'app-rimsky',
  templateUrl: './rimsky.component.html',
  styleUrls: ['./rimsky.component.scss'],
})
export class RimskyComponent implements OnInit {
  products!: Product[][];

  constructor(
    private cartService: CartService,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.products = this.apiService.products;
  }

  addToCart(pizza: Product) {
    this.cartService.addPizza(pizza);
  }
}
