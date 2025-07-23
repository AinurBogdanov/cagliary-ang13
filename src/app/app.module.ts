import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { HomeComponent } from './features/home/home.component';
import { CartComponent } from './features/cart/cart.component';
import { Sliders } from './features/cart/sliders/sliders.component';
import { ItemCardComponent } from './features/cart/item-card/item-card.component';
import { PromoComponent } from './features/cart/promo/promo.component';
import { CreateOrderComponent } from './features/cart/create-order/create-order.component';
import { LoginComponent } from './features/login/login.component';
import { FormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { HttpClientModule } from '@angular/common/http';
import { MenuComponent } from './features/menu/menu.component';
import { PromoPageComponent } from './features/promo-page/promo-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CartComponent,
    Sliders,
    ItemCardComponent,
    PromoComponent,
    CreateOrderComponent,
    LoginComponent,
    MenuComponent,
    PromoPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    CoreModule,
    HttpClientModule,
    FormsModule,
    NgxMaskModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
