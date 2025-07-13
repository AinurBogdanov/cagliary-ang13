import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent {
  selectedDrink: string = 'cola';
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
