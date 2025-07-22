import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from 'src/app/core/data/interfaces/product';

@Component({
  selector: 'app-dish-card',
  templateUrl: './dish-card.component.html',
  styleUrls: ['./dish-card.component.scss'],
})
export class DishCardComponent {
  @Input() product!: Product;
  @Input() folder!: string;
  @Input() currentPageIndex!: number;
  @Output() addedToCart = new EventEmitter();

  onAddToCart(product: Product, currentPageIndex: number) {
    const data = { product, currentPageIndex };
    this.addedToCart.emit(data);
  }
}
