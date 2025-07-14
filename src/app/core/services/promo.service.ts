import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PromoService {
  cartItems$ = new BehaviorSubject<cartProduct[]>(cart);

  selectedDrink: string = 'Cola';
  promoSelected: boolean = true;

  selectDrink(val: string) {
    this.selectedDrink = val;
  }
  togglePromo(event: Event) {
    this.promoSelected = !this.promoSelected;
    console.log(this.promoSelected);
    event.stopPropagation();
  }
}
