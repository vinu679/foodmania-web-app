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

@NgModule({
  declarations: [
    AppComponent,
    RestaurantComponent,
    SidenavComponent,
    HeaderComponent,
    RestaurantDetailsComponent
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
