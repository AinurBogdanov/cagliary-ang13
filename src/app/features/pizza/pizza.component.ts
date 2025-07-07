import { Component, OnInit } from '@angular/core';
import { fakeApiResp } from 'src/app/core/data/data';
import { Product } from 'src/app/core/data/interfaces';

@Component({
  selector: 'app-pizza',
  templateUrl: './pizza.component.html',
  styleUrls: ['./pizza.component.scss'],
})
export class PizzaComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  products: Product[] = fakeApiResp.products;
}
