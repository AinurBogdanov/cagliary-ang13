import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { cartProduct } from 'src/app/core/data/interfaces/cartProduct';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.scss'],
})
export class ItemCardComponent implements OnInit {
  @Input() item!: cartProduct;
  @Output() addPizza = new EventEmitter<string>();
  sauceNames: string = 'не сырный';
  @Output() minusOneOfCart = new EventEmitter<cartProduct>();
  @Output() deleteItem = new EventEmitter<cartProduct>();

  constructor() {}

  ngOnInit(): void {}

  onAddPizza() {
    this.addPizza.emit(this.item.id);
  }

  onMinusOneOfCart() {
    this.minusOneOfCart.emit(this.item);
  }
  onDeleteItem() {
    this.deleteItem.emit(this.item);
  }

  selectSauce() {}

  // findSauceNames(ids: number[]) {
  //   if (ids) {
  //     const sauces = ids
  //       .map((id) => {
  //         const sauce = this.sauceOptions.find((sauce) => sauce.id === id);
  //         return sauce ? sauce.name : null;
  //       })
  //       .filter((name) => name !== null);

  //     return sauces.join(', ');
  //   }
  //   return null;
  // }
}
