import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  BackendProduct,
  ProductWithCategory,
  size,
} from 'src/app/core/interfaces/product';

@Component({
  selector: 'app-dish-card',
  templateUrl: './dish-card.component.html',
  styleUrls: ['./dish-card.component.scss'],
})
export class DishCardComponent {
  @Input() product!: ProductWithCategory;
  @Input() folder!: string;
  @Input() currentPageIndex!: number;
  @Output() addedToCart = new EventEmitter();
  @Output() choseSize = new EventEmitter();

  onAddToCart(product: BackendProduct, currentPageIndex: number) {
    const data = { product, currentPageIndex };
    this.addedToCart.emit(data);
  }
  onChoseSize(size: size, productId: string) {
    const sizeAndId = { size, productId };
    this.choseSize.emit(sizeAndId);
  }
}
