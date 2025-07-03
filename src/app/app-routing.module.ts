import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './features/home/home.component';
import { PizzaComponent } from './features/pizza/pizza.component';

const routes: Routes = [
  {
   path: '', component: HomeComponent
  },{
    path: 'pizza', component: PizzaComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
