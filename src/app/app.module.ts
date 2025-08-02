import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { HomeComponent } from './features/home/home.component';
import { CartComponent } from './features/cart/cart.component';
import { Sliders } from './features/cart/sliders/sliders.component';
import { ItemCardComponent } from './features/cart/item-card/item-card.component';
import { PromoComponent } from './features/cart/promo/promo.component';
import { LoginComponent } from './features/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { HttpClientModule } from '@angular/common/http';
import { MenuComponent } from './features/menu/menu.component';
import { PromoPageComponent } from './features/promo-page/promo-page.component';
import { ModalComponent } from './features/cart/modal/modal.component';
import { CreateOrderComponent } from './features/create-order/create-order.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { FormatDataPipe } from './core/pipes/format-data.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CartComponent,
    Sliders,
    ItemCardComponent,
    PromoComponent,
    LoginComponent,
    MenuComponent,
    PromoPageComponent,
    ModalComponent,
    CreateOrderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    CoreModule,
    HttpClientModule,
    NgxMaskModule.forRoot(),
    BrowserAnimationsModule,
    MatSnackBarModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [FormatDataPipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
