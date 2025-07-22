import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { CartService } from '../../../core/services/cart.service';
import { map, Observable } from 'rxjs';
import { Cart } from 'src/app/core/data/interfaces/cart';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  hideBackground = false;
  cart$: Observable<Cart> = this.cartService.getCart();
  totalCost$ = this.cart$.pipe(
    map((cart: Cart) => (cart ? cart.totalCost : 0))
  );
  totalQuantity$ = this.cart$.pipe(
    map((cart: Cart) =>
      cart
        ? cart.products.reduce((sum, product) => sum + product.quantity, 0)
        : 0
    )
  );

  constructor(private router: Router, private cartService: CartService) {
    this.router.events.subscribe((event) => {
      this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          this.hideBackground = event.url !== '/';
        }
      });
    });
  }

  ngOnInit(): void {}
}
