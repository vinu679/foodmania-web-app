import { Component, HostBinding, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  toggleNav: boolean = true;
  selectedLink: string = "home";
  @HostBinding('class.close-side-nav') isActive: boolean;

  constructor() { }

  ngOnInit(): void { }

  toggleSideNav() {
    this.toggleNav = !this.toggleNav;
    this.isActive = !this.toggleNav;
  }

  onLinkActive(data: string){
    this.selectedLink = data;
  }

}
