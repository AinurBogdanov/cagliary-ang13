import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SaucesService {
  private sauceNamesSubject = new BehaviorSubject<string>('Сырный');
  sauceNames$: Observable<string> = this.sauceNamesSubject.asObservable();

  constructor() {}

  selectNewSauce() {
    this.sauceNamesSubject.next('1000 остров');
  }
}
