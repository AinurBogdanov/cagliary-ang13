import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { PizzaComponent } from './features/pizza/pizza.component';
import { CoreModule } from './core/core.module';
import { HomeComponent } from './features/home/home.component';
import { CartComponent } from './features/cart/cart.component';
import { Sliders } from './features/cart/sliders/sliders.component';

@NgModule({
  declarations: [
    AppComponent,
    PizzaComponent,
    HomeComponent,
    CartComponent,
    Sliders,
  ],
  imports: [BrowserModule, AppRoutingModule, SharedModule, CoreModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
