import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { DishCardComponent } from './components/dish-card/dish-card.component';
import { AppRoutingModule } from '../app-routing.module';
import { PageTitleComponent } from './components/page-title/page-title.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    DishCardComponent,
    PageTitleComponent,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    DishCardComponent,
    PageTitleComponent,
  ],
  imports: [CommonModule, AppRoutingModule, ReactiveFormsModule],
})
export class SharedModule {}
