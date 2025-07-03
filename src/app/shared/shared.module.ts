import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { DishCardComponent } from './components/dish-card/dish-card.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    DishCardComponent
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    DishCardComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
