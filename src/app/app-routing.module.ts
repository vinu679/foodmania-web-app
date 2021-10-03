import { SettingsComponent } from './components/settings/settings.component';
import { HelpComponent } from './components/help/help.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { OrdersComponent } from './components/orders/orders.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RestaurantDetailsComponent } from './components/restaurant/restaurant-details/restaurant-details.component';
import { RestaurantComponent } from './components/restaurant/restaurant.component';

const routes: Routes = [
  { path: "", component: RestaurantComponent },
  { path: "resturant", component: RestaurantComponent },
  { path: "resturantDetails", component: RestaurantDetailsComponent },
  { path: "orders", component: OrdersComponent },
  { path: "notifications", component: NotificationsComponent },
  { path: "help", component: HelpComponent },
  { path: "settings", component: SettingsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
