import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from './../../environments/environment.prod';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  public readonly baseUrl = environment.apiUrl;
  private searchFilter = new BehaviorSubject<any>("");
  private activateFilter = new BehaviorSubject<boolean>(true);
  private cuisinesFilter = new BehaviorSubject<any>([]);
  searchTerm = this.searchFilter.asObservable();
  selectedCuisines = this.cuisinesFilter.asObservable();
  activateSearchFilter = this.activateFilter.asObservable();

  constructor(private http: HttpClient) {}

  getAllRestaurants():Observable<any>{
    return this.http.get(this.baseUrl + "allRestaurants");
  }

  getRestaurantById(id: any):Observable<any> {
    return this.http.get(this.baseUrl + `/restaurantDetails/${id}`);
  }

  searchRestaurants(searchTerm: string):Observable<any>{
    return this.http.get(this.baseUrl + `allRestaurants?filter[restaurantName]=${searchTerm}`);
  }

  changeSearchFilter(text: string) {
    this.searchFilter.next(text);
  }

  changeCuisinesFilter(data:any) {
    this.cuisinesFilter.next(data);
  }

  deactivateFilter(status: boolean) {
    this.activateFilter.next(status);
  }

  getMenuItems():Observable<any>{
    return this.http.get(this.baseUrl + "menu");
  }

  getSelectedCategories(event: any, categories: any, id: string) {
    if (event.target.id === id) {
      if (categories[0].isChecked) {
        categories.forEach(ele => {
          ele.isChecked = true;
        });
      }
      else {
        categories.forEach(ele => {
          ele.isChecked = false;
        });
      }
    }
    else {
      categories[0].isChecked = false;
      let otherSeltection = categories.filter(x => x.isChecked == true);
      if (otherSeltection.length == categories.length-1) {
        categories[0].isChecked = true;
      }
    }

    return categories;
  }
}
