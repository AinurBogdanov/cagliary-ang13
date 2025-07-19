import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { PizzaComponent } from './features/pizzas/pizzas.component';
import { CartComponent } from './features/cart/cart.component';
import { SloenyComponent } from './features/sloeny/sloeny.component';

const routes: Routes = [
  {
    path: 'pizza',
    component: PizzaComponent,
  },
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'sloeny',
    component: SloenyComponent,
  },
  {
    path: 'cart',
    component: CartComponent,
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
