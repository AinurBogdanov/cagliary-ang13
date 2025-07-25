import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { sauces } from 'src/app/core/data/backData/sauces-data';
import { cartProduct } from 'src/app/core/data/interfaces/cartProduct';
import { Sauce } from 'src/app/core/data/interfaces/sauce';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  sauces: Sauce[] = sauces;
  productSauces!: Sauce[]; //заменить на соус из товара
  productQuantity!: number;

  freePick!: number;
  // saucesPicked!: number[];

  @Input() productId!: string | null;
  @Input() cartProducts!: cartProduct[] | null;

  @Output() selectSauce = new EventEmitter();
  @Output() closeModal = new EventEmitter();

  constructor() {}

  // Получаем соусы из продукта
  ngOnInit(): void {
    if (this.productId && this.cartProducts) {
      const product = this.cartProducts.find((cartProduct) => {
        return cartProduct.id === this.productId;
      });
      if (product) {
        this.productSauces = product.sauces;
        this.productQuantity = product.quantity;
        this.freePick = product.quantity;
      } else {
        this.productSauces = [this.sauces[7]];
      }
    }
  }

  onSelectSauce(sauce: Sauce) {
    this.selectSauce.emit(this.productSauces); //какой массив отправлю такие соусы и будут
  }

  onCloseModal() {
    this.closeModal.emit();
  }
}
