import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { sauces } from 'src/app/core/data/backData/sauces-data';
import { cartProduct } from 'src/app/core/data/interfaces/cartProduct';
import { Sauce } from 'src/app/core/data/interfaces/sauce';
import { Cart } from '../../../core/data/interfaces/cart';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  sauces: Sauce[] = sauces;
  productSauces!: Sauce[]; //заменить на соусы из товара
  productQuantity!: number;

  freePick!: number;
  saucesPicked!: number;

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
      const index = this.sauces.findIndex((sauce) => {
        return sauce.id === id;
      });
      if (index !== -1) {
        this.sauces[index].count += 1;
        this.freePick -= 1;
      }
    }
  }
  removeOneSauce(id: number) {
    const index = this.sauces.findIndex((sauce) => {
      return sauce.id === id;
    });
    if (index !== -1) {
      if (this.sauces[index].count >= 1) {
        this.sauces[index].count -= 1;
        this.freePick += 1;
      }
      console.log(this.sauces);
    }
  }

  onSelectSauce(newSauce: Sauce) {
    this.sauces = this.sauces.map((sauce) => {
      if (sauce.id === newSauce.id) {
        sauce.count = 1;
        return sauce;
      } else {
        sauce.count = 0;
        return sauce;
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
