import { RestaurantService } from 'src/app/services/restaurant.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-restaurant-details',
  templateUrl: './restaurant-details.component.html',
  styleUrls: ['./restaurant-details.component.scss']
})
export class RestaurantDetailsComponent implements OnInit, OnDestroy {
  data: any;
  categories: any;
  dataSource: any = [];
  duplicateData: any = [];
  selectedCategories = [];
  baked: number = 0;
  sweet: number = 0;
  hotDish: number = 0;
  getRestaurantSub: Subscription;
  getRestaurantMenuSub: Subscription;
  constructor(private _resturantService: RestaurantService, private router: Router) { }

  ngOnInit() {
    this._resturantService.deactivateFilter(false);
    this.categories = [
      { label: 'All', isChecked: false },
      { label: 'Baked', isChecked: false, count: 0},
      { label: 'Sweet', isChecked: false, count: 0 },
      { label: 'Hot Dish', isChecked: false, count: 0 }
    ];
    if (history.state.data) {
      this.getRestaurantSub =  this._resturantService.getRestaurantById(history.state.data.id).subscribe(res => {
        this.data = res.restaurantDetail;
      });

      this.getRestaurantMenuSub = this._resturantService.getMenuItems().subscribe(res => {
        (res.menu).forEach((x) => {
          let data = JSON.parse(x.restaurantName);
          if (data.includes(history.state.data.restaurantName)) {
            this.dataSource.push(x);
          }
        });

        this.duplicateData = this.dataSource;

        this.dataSource.forEach(ele => {
          let data = JSON.parse(ele.itemCategory);
          if (data.includes("Baked")) {
            this.categories[1].count = this.categories[1].count + 1;
          }
          if (data.includes("Sweet")) {
            this.categories[2].count = this.categories[2].count + 1;
          }
          if (data.includes("Hot Dish")) {
            this.categories[3].count = this.categories[3].count + 1;
          }
        });
      });
    }
    else{
      this.router.navigate(['/resturant']);
    }
  }

  categotySelection(event: any) {
    this.categories = this._resturantService.getSelectedCategories(event, this.categories, "mItem-0");

    this.selectedCategories = [];
    this.dataSource = this.duplicateData;
    
    this.categories.forEach((ele) => {
      if (ele.isChecked) {
        this.selectedCategories.push(ele.label);
      }
    });

    if (this.selectedCategories.length > 0 && this.selectedCategories.indexOf('All') == -1) {
      let filteredData = [];
      this.dataSource.forEach((x) => {
        let data = JSON.parse(x.itemCategory);
        if (data.some((val) => this.selectedCategories.includes(val))) {
          filteredData.push(x);
        }
      });
      this.dataSource = filteredData;
    }
  }

  ngOnDestroy() {
    this._resturantService.deactivateFilter(true);
    if (history.state.data) {
      this.getRestaurantSub.unsubscribe();
      this.getRestaurantMenuSub.unsubscribe();
    }
  }

}
