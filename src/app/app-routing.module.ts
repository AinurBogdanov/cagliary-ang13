import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { PizzaComponent } from './features/pizzas/pizzas.component';
import { CartComponent } from './features/cart/cart.component';
import { SloenyComponent } from './features/sloeny/sloeny.component';
import { LoginComponent } from './features/login/login.component';
import { RimskyComponent } from './features/rimsky/rimsky.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'pizza',
    component: PizzaComponent,
  },
  {
    path: 'sloeny',
    component: SloenyComponent,
  },
  {
    path: 'rimsky',
    component: RimskyComponent,
  },
  {
    path: 'cart',
    component: CartComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
      enableTracing: false, // Для отладки (можно отключить в продакшене)
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
