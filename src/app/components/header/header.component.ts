import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { RestaurantService } from 'src/app/services/restaurant.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, AfterViewInit, OnDestroy {
  searchText: string = "" ;
  isOpened: boolean = false;
  isActive: boolean = true;
  data: any = [];
  duplicateData: any = [];
  cuisines: any = [];
  selectedCuisines = [];
  toggleFilter: boolean = false;
  getAllRestaurantsSub: Subscription;
  allCuisines: any = [{label:"All", isChecked: false}]

  constructor(private _restaurantService: RestaurantService) { }

  ngOnInit() {
    this.getAllRestaurants();
  }

  ngAfterViewInit() {
    new Promise((resolve,reject) => {
      this._restaurantService.activateSearchFilter.subscribe(status => {
        this.isActive = status;
        resolve(status);
      });
    })
  }  

  getAllRestaurants() {
    this.getAllRestaurantsSub = this._restaurantService.getAllRestaurants().subscribe((res) => {
      this.data = res.allRestaurants;
      this.duplicateData = this.data;
      this.data.forEach(item => {
        let parseData = JSON.parse(item.restaurantCuisine)
        this.cuisines = [...this.cuisines,...parseData];
      });
      this.cuisines =  [...new Set(this.cuisines)];
      this.cuisines.forEach(x => {
        this.allCuisines.push({label:x, isChecked: false})
      });
    });
  }

  applyFilter(data: string) {
    this._restaurantService.changeSearchFilter(data.toLocaleLowerCase());
  }

  clearSearch(event: any) {
    if (event.key === "Backspace" || event.key === "Delete") {
      this.applyFilter(event.target.value);
    }
  }

  toggleFilterPanel() {
    this.toggleFilter = !this.toggleFilter;
  }

  applyFilterPanel() {
    this.selectedCuisines = [];
    if (this.allCuisines[0].isChecked) {
      this.selectedCuisines = this.cuisines;
    }
    else {
      this.allCuisines.forEach(item => {
        if(item.isChecked) {
          this.selectedCuisines.push(item.label);
        }
      });
    }

    if (this.isOpened) {
      this.data = this.data.filter(x => { return x.isOpen == true });
    }
    else {
      this.data = this.duplicateData;
    }

    if (this.selectedCuisines.length > 0) {
      let filteredData = [];
      this.data.forEach((x) => {
        let data = JSON.parse(x.restaurantCuisine);
        if (data.some((val) => this.selectedCuisines.includes(val))) {
          filteredData.push(x);
        }
      });
      this._restaurantService.changeCuisinesFilter(filteredData);
    } 
    else {
      this._restaurantService.changeCuisinesFilter(this.data);
    }
    this.toggleFilter = !this.toggleFilter;
  }

  onChangeCuisines(event: any) {
    this.allCuisines = this._restaurantService.getSelectedCategories(event, this.allCuisines, "cItem-0");
  }

  ngOnDestroy() {
    this.getAllRestaurantsSub.unsubscribe();
  }

}
