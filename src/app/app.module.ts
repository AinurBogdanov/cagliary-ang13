import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { PizzaComponent } from './features/pizzas/pizzas.component';
import { CoreModule } from './core/core.module';
import { HomeComponent } from './features/home/home.component';
import { CartComponent } from './features/cart/cart.component';
import { Sliders } from './features/cart/sliders/sliders.component';
import { ItemCardComponent } from './features/cart/item-card/item-card.component';
import { PromoComponent } from './features/cart/promo/promo.component';
import { SaltyComponent } from './features/salty/salty.component';
import { CreateOrderComponent } from './features/cart/create-order/create-order.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    PizzaComponent,
    HomeComponent,
    CartComponent,
    Sliders,
    ItemCardComponent,
    PromoComponent,
    SaltyComponent,
    CreateOrderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    CoreModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
