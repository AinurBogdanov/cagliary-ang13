import { Component, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { Product } from 'src/app/core/data/interfaces/product';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-salty',
  templateUrl: './sloeny.component.html',
  styleUrls: ['./sloeny.component.scss'],
})
export class SloenyComponent implements OnInit {
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
