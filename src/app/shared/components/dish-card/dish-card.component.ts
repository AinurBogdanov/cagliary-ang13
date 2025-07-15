import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from 'src/app/core/data/interfaces/product';

@Component({
  selector: 'app-dish-card',
  templateUrl: './dish-card.component.html',
  styleUrls: ['./dish-card.component.scss'],
})
export class DishCardComponent {
  @Input() product!: Product;
  @Output() addedToCart = new EventEmitter();

  onAddToCart() {
    this.addedToCart.emit(this.product);
  }
}
