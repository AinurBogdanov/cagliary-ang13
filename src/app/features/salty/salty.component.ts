import { Component, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { Product } from 'src/app/core/data/interfaces/product';

@Component({
  selector: 'app-salty',
  templateUrl: './salty.component.html',
  styleUrls: ['./salty.component.scss'],
})
export class SaltyComponent implements OnInit {
  readonly products: any;

  constructor(private readonly cartService: CartService) {}

  addToCart(pizza: Product) {
    this.cartService.addPizza(pizza);
  }

  ngOnInit(): void {}
}
