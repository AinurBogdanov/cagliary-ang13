import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Drink } from '../interfaces/drinks';

@Injectable({
  providedIn: 'root',
})
export class PromoService {
  private selectedDrinkSubject = new BehaviorSubject<Drink>(Drink.cola);
  private promoSelectedSubject = new BehaviorSubject<boolean>(true);

  selectedDrink$: Observable<Drink> = this.selectedDrinkSubject.asObservable();
  promoSelected$: Observable<boolean> =
    this.promoSelectedSubject.asObservable();

  selectDrink(drink: Drink) {
    this.selectedDrinkSubject.next(drink);
  }
  togglePromo() {
    this.promoSelectedSubject.next(!this.promoSelectedSubject.value);
  }
}
