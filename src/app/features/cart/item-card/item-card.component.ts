import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { sauces } from 'src/app/core/data/backData/sauces-data';
import { cartProduct } from 'src/app/core/data/interfaces/cartProduct';
import { SaucesService } from 'src/app/core/services/sauces.service';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.scss'],
})
export class ItemCardComponent implements OnInit {
  @Input() item!: cartProduct;
  @Output() addPizza = new EventEmitter<string>();
  sauceNames: string = 'не сырный';

  private readonly subscription = new Subscription();

  constructor(private readonly sauceService: SaucesService) {}

  ngOnInit(): void {
    this.subscription.add(
      this.sauceService.sauceNames$.subscribe((sauceNames) => {
        this.sauceNames = sauceNames;
      })
    );
  }

  onAddPizza() {
    this.addPizza.emit(this.item.id);
  }

  selectSauce() {
    this.sauceService.selectNewSauce();
  }

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
