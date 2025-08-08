import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { sauces } from '../../../core/data/sauces-data';
import type { Sauce } from 'src/app/core/interfaces/sauce';
import type { cartProduct } from 'src/app/core/interfaces/product';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.scss'],
})
export class ItemCardComponent implements OnInit {
  sauceNames: string = '';
  sauceOptions: Sauce[] = sauces;
  @Input() item!: cartProduct;
  @Output() addPizza = new EventEmitter<string>();
  @Output() minusOneOfCart = new EventEmitter<cartProduct>();
  @Output() deleteItem = new EventEmitter<cartProduct>();
  @Output() showModal = new EventEmitter();

  constructor() {}

  ngOnInit(): void {
    this.sauceNames = this.findSauceNames(this.item.sauces);
  }

  onAddPizza() {
    this.addPizza.emit(this.item.id);
  }

  onMinusOneOfCart() {
    this.minusOneOfCart.emit(this.item);
  }
  onDeleteItem() {
    this.deleteItem.emit(this.item);
  }
  onShowModal() {
    this.showModal.emit(this.item.id);
  }
  selectSauce() {
    this.onShowModal();
  }

  findSauceNames(sauces: Sauce[]): string {
    const namesArray = sauces.map((sauce) => {
      return Array(sauce.count).fill(sauce.name).join(', ');
    });
    const result = namesArray.join(', ');
    return result;
  }
}

//   if (Array.isArray(ids)) {
//     const sauces = ids
//       .map((id) => {
//         const sauce = this.sauceOptions.find((sauce) => sauce.id === id);
//         return sauce?.name ?? null;
//       })
//       .filter((name) => name !== null);

//     return sauces.join(', ');
//   } else if (typeof ids === 'number') {
//     const sauce = this.sauceOptions.find((option) => option.id === ids);
//     return sauce?.name ?? '';
//   }
//   return '';
//
