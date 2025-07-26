import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product, size } from 'src/app/core/data/interfaces/product';

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
  @Output() choseSize = new EventEmitter();

  onAddToCart(product: Product, currentPageIndex: number) {
    const data = { product, currentPageIndex };
    this.addedToCart.emit(data);
  }
  onChoseSize(size: size, productId: string) {
    const sizeAndId = { size, productId };
    this.choseSize.emit(sizeAndId);
  }
}
