import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/core/data/interfaces';

@Component({
  selector: 'app-dish-card',
  templateUrl: './dish-card.component.html',
  styleUrls: ['./dish-card.component.scss'],
})
export class DishCardComponent {
  @Input() product: Product | null = null;
}
