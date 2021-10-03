import { RouterModule } from '@angular/router';
import { AuthInterceptor } from './http-interceptors/auth-interceptor';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RestaurantComponent } from './components/restaurant/restaurant.component';
import { RestaurantService } from './services/restaurant.service';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { HeaderComponent } from './components/header/header.component';
import { RestaurantDetailsComponent } from './components/restaurant/restaurant-details/restaurant-details.component';
import { FormsModule } from '@angular/forms';
import { OrdersComponent } from './components/orders/orders.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { HelpComponent } from './components/help/help.component';
import { SettingsComponent } from './components/settings/settings.component';

@NgModule({
  declarations: [
    AppComponent,
    RestaurantComponent,
    SidenavComponent,
    HeaderComponent,
    RestaurantDetailsComponent,
    OrdersComponent,
    NotificationsComponent,
    HelpComponent,
    SettingsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    RestaurantService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
