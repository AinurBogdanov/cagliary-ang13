import { Component, EventEmitter, Input, Output } from '@angular/core';
import { sauces } from 'src/app/core/data/sauces-data';
import { cartProduct } from 'src/app/core/interfaces/cartProduct';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.scss'],
})
export class ItemCardComponent {
  @Input() item!: cartProduct;
  @Output() addPizza = new EventEmitter<string>();

  onAddPizza() {
    this.addPizza.emit(this.item.id);
  }

  sauceOptions = sauces;

  findSauceNames(ids: number[]) {
    if (ids) {
      const sauces = ids
        .map((id) => {
          const sauce = this.sauceOptions.find((sauce) => sauce.id === id);
          return sauce ? sauce.name : null;
        })
        .filter((name) => name !== null);

      return sauces.join(', ');
    }
    return null;
  }
}
