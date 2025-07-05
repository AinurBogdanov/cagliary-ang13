import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { PizzaComponent } from './features/pizza/pizza.component';
import { CoreModule } from './core/core.module';

@NgModule({
  declarations: [
    AppComponent,
    PizzaComponent,
  ],
  imports: [
    SharedModule,
    BrowserModule,
    AppRoutingModule,
    CoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
