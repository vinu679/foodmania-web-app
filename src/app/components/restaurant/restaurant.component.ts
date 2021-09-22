import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { RestaurantService } from 'src/app/services/restaurant.service';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.scss'],
})
export class RestaurantComponent implements OnInit, AfterViewInit {
  dataSource: any = [];
  duplicateData: any = [];
  categories: any;
  selectedCategories = [];
  searchRestaurant: string = "";
  getAllRestaurantsSub: Subscription;
  test:string = "";
  selectedIndex: number = null;
  constructor(private _restaurantService: RestaurantService, private router: Router) {}
  ngAfterViewInit() {
    new Promise((resolve, reject) => {
      this._restaurantService.searchTerm.subscribe((term) => {
          this.applyFilter(term);
          resolve(term);
      });
    });

    new Promise((resolve,reject) => {
      this._restaurantService.selectedCuisines.subscribe(data => {
        if(data.length > 0) {
          this.dataSource = data;
          this.duplicateData = this.dataSource;
          this.applyFilter();
          resolve(data);
        }
      });
    });
    
  }

  ngOnInit() {
    this.categories = [
      { label: 'Baked', isChecked: false },
      { label: 'Sweet', isChecked: false },
      { label: 'Hot Dish', isChecked: false },
      { label: 'Fast Food', isChecked: false },
      { label: 'Salads', isChecked: false },
    ];
    if (this.dataSource === undefined ||this.dataSource.length == 0) {
      this.getAllRestaurants();
    }
  }

  applyFilter(changes ?: any) {
    this.dataSource = this.duplicateData;
    this.searchRestaurant = changes?.length > 0 ? changes : "";
    if (this.searchRestaurant && this.searchRestaurant.length > 0) {
      this.dataSource = this.dataSource.filter(obj =>{
        return ((obj.restaurantName).toLocaleLowerCase() === this.searchRestaurant)
      });
      console.log(this.dataSource);
    } 
    else {
      if(this.categories.some(x => x.isChecked == true)) {
        this.categotySelection();
      }
      else {
        this.dataSource = this.duplicateData;
      }
    }
  }
  getAllRestaurants() {
    this.getAllRestaurantsSub = this._restaurantService.getAllRestaurants().subscribe((res) => {
      this.dataSource = res.allRestaurants;
      this.duplicateData = this.dataSource;
    });
  }

  categotySelection() {
    this.selectedCategories = [];
    this.dataSource = this.searchRestaurant ? this.dataSource : this.duplicateData;
    
    this.categories.forEach((ele) => {
      if (ele.isChecked) {
        this.selectedCategories.push(ele.label);
      }
    });
    this.filterCategory();
  }

  filterCategory() {
    if (this.selectedCategories.length > 0) {
      let filteredData = [];
      this.dataSource.forEach((x) => {
        let data = JSON.parse(x.restaurantCategory);
        if (data.some((val) => this.selectedCategories.includes(val))) {
          filteredData.push(x);
        }
      });
      this.dataSource = filteredData;
    }
    else {
      this.applyFilter();
    }
  }

  onView(data) {
    this.router.navigate(['/resturantDetails'],{state: { data: data }})
  }

  setIndex(event, index: number) {
    event.preventDefault();
    if (this.selectedIndex == index) {
      this.selectedIndex = -1;
    } else {
      this.selectedIndex = index;
    }
  }

  ngOnDestory() {
    this.getAllRestaurantsSub.unsubscribe();
  }
}
