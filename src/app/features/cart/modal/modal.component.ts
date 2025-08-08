import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { sauces } from 'src/app/core/data/sauces-data';
import type { cartProduct } from 'src/app/core/interfaces/product';
import type { Sauce } from 'src/app/core/interfaces/sauce';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  sauces: Sauce[] = sauces;
  productSauces: Sauce[] = []; //заменить на соусы из товара
  productQuantity: number = 0;

  freePick: number = 0;
  saucesPicked: number = 0;

  @Input() productId: string | null = '';
  @Input() cartProducts: cartProduct[] | null = null;

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
        this.sauces = this.sauces.map((sauce) => {
          const foundSauce = product.sauces.find((productSauce) => {
            return productSauce.id === sauce.id;
          });
          if (foundSauce) {
            return foundSauce;
          } else {
            sauce.count = 0;
            return sauce;
          }
        });

        this.productQuantity = product.quantity;
        this.saucesPicked = this.sauces.reduce(
          (sum, sauce) => sum + sauce.count,
          0
        );
        this.freePick = this.productQuantity - this.saucesPicked;
      } else {
        this.productSauces = this.findSauces();
      }
    }
  }

  addOneSauce(id: number) {
    if (this.freePick > 0) {
      const index = this.sauces.findIndex((sauce) => sauce.id === id);
      if (index !== -1) {
        const sauce = this.sauces[index];
        const updatedSauce = { ...sauce, count: sauce.count + 1 };
        this.sauces = [
          ...this.sauces.slice(0, index),
          updatedSauce,
          ...this.sauces.slice(index + 1),
        ];
        this.freePick -= 1;
      }
    }
  }
  removeOneSauce(id: number) {
    const index = this.sauces.findIndex((sauce) => sauce.id === id);
    if (index !== -1 && this.sauces[index].count >= 1) {
      const sauce = this.sauces[index];
      const updatedSauce = { ...sauce, count: sauce.count - 1 };
      this.sauces = [
        ...this.sauces.slice(0, index),
        updatedSauce,
        ...this.sauces.slice(index + 1),
      ];
      this.freePick += 1;
    }
  }

  onSelectSauce(newSauce: Sauce) {
    this.sauces = this.sauces.map((sauce) => {
      if (sauce.id === newSauce.id) {
        return { ...sauce, count: 1 };
      } else {
        return { ...sauce, count: 0 };
      }
    });
    const cleanSauces = this.sauces.filter((sauce) => sauce.count >= 1);
    this.selectSauce.emit(cleanSauces); //какой массив отправлю такие соусы и будут
  }

  onCloseModal() {
    const cleanSauces = this.sauces.filter((sauce) => sauce.count >= 1);
    this.selectSauce.emit(cleanSauces);
    this.closeModal.emit();
  }

  private findSauces() {
    if (this.cartProducts) {
      const product = this.cartProducts.find((product) => {
        return product.id === this.productId;
      });
      if (product) {
        return product.sauces;
      }
    }
    return [];
  }
}
