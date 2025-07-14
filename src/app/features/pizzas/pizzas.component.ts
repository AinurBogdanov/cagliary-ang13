import { Component, OnInit } from '@angular/core';
import { fakeApiResp } from 'src/app/core/data/pizzas';
import { Product } from 'src/app/core/interfaces/fakeApi';

@Component({
  selector: 'app-pizza',
  templateUrl: './pizzas.component.html',
  styleUrls: ['./pizzas.component.scss'],
})
export class PizzaComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  products: Product[] = fakeApiResp.products;
}
