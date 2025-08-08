import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { Drink } from 'src/app/core/interfaces/drinks';
import { PromoService } from 'src/app/core/services/promo.service';

@Component({
  selector: 'app-promo',
  templateUrl: './promo.component.html',
  styleUrls: ['./promo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PromoComponent implements OnInit, OnDestroy {
  readonly Drink = Drink;

  selectedDrink: Drink = Drink.cola;
  promoSelected: boolean = true;

  private subscription = new Subscription();

  constructor(private promoService: PromoService) {}

  ngOnInit(): void {
    this.subscription.add(
      this.promoService.selectedDrink$.subscribe((drink) => {
        this.selectedDrink = drink;
      })
    );

    this.subscription.add(
      this.promoService.promoSelected$.subscribe((isSelected) => {
        this.promoSelected = isSelected;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  selectDrink(drink: Drink) {
    this.promoService.selectDrink(drink);
  }
  togglePromo() {
    this.promoService.togglePromo();
  }
}
