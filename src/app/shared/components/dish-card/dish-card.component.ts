import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dish-card',
  templateUrl: './dish-card.component.html',
  styleUrls: ['./dish-card.component.scss']
})
export class DishCardComponent implements OnInit {
  @Input() product: any

  constructor() { }
  
  ngOnInit(): void {
  }

}
