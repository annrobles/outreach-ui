import { UntilDestroy } from '@ngneat/until-destroy';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError} from '@angular/router';

import { UserAccessType } from "../../../../models/user-access-type.enum";

import { AuthService } from '../../../../services/auth.service';
import { HeaderService } from '../../../../services/header.service';
import { MenuItem } from 'primeng/api';

@UntilDestroy()
@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit, OnDestroy {

  userAccessType = UserAccessType;
  userType: number =  UserAccessType.None;
  mainNavItems: {name: string, link: string, active: boolean}[] = [];
  headerVisible: boolean = false;

  items: MenuItem[] = [];

  constructor(
    private router: Router,
    private authService: AuthService,
    private headerService: HeaderService
  ) {
    this.headerService.headerVisibilityChange.subscribe(value => {
      this.headerVisible = value;
    });

    this.authService.userTypeChange.subscribe(value => {
      this.userType = value;
    });

    this.authService.mainNavItemsChange.subscribe(value => {
      this.mainNavItems = value;
    });

    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        // Show progress spinner or progress bar
      }

      if (event instanceof NavigationEnd) {    
        if (event.url == "/signin" || event.url == "/signup" || event.url  == "/")  {
          this.headerVisible = false;
        }
      }
    });
   }

  ngOnInit(): void {
    this.headerVisible = localStorage.getItem("headerVisible") == "true" ? true : false;
    this.userType = parseInt(localStorage.getItem("userType") || "");

    let mainNavItems = localStorage.getItem("mainNavItems");
    this.mainNavItems =  mainNavItems ? JSON.parse(mainNavItems) : [];

    this.items = [
      {
          label:'Sign out',
          icon:'pi pi-fw pi-power-off',
          command: () => this.signOut(),
      }
  ];
  }

  ngOnDestroy(){
  }

  navigateTo(route: {name: string, link: string, active: boolean}) {
    this.router.navigateByUrl(route.link);
    this.mainNavItems.map((item) => {
      item.active = route.name == item.name ? true : false;
    })
  }

  signOut() {
    localStorage.setItem("userType", "");
    localStorage.setItem("mainNavItems", "");
    localStorage.setItem("headerVisible", "");
    localStorage.setItem("token", "");
    localStorage.setItem("user", "");
    this.router.navigateByUrl('/signin');
    this.authService.user = null;
  }

}
