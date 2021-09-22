import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RestaurantDetailsComponent } from './components/restaurant/restaurant-details/restaurant-details.component';
import { RestaurantComponent } from './components/restaurant/restaurant.component';

const routes: Routes = [
  { path: "", component: RestaurantComponent },
  { path: "resturant", component: RestaurantComponent },
  { path: "resturantDetails", component: RestaurantDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
