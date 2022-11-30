import { UntilDestroy } from '@ngneat/until-destroy';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, Event, NavigationStart, NavigationEnd } from '@angular/router';

import { UserAccessType } from "../../../../models/user-access-type.enum";

import { AuthService } from '../../../../services/auth.service';
import { HeaderService } from '../../../../services/header.service';


@UntilDestroy()
@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit, OnDestroy {

  userAccessType = UserAccessType;
  userType: number =  UserAccessType.None;
  mainNavItems: {label: string, url: string, active: boolean}[] = [];
  headerVisible: boolean = false;
  bannerText: string = "";

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
    this.bannerText = localStorage.getItem("bannerText") || "";
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

        this.mainNavItems.map((item) => {
          item.active = event.url  == item.url ? true : false;
        });
      }
    });
   }

  ngOnInit(): void {
    this.bannerText = localStorage.getItem("bannerText") || "";

    this.headerVisible = localStorage.getItem("headerVisible") == "true" ? true : false;
    this.userType = parseInt(localStorage.getItem("userType") || "");

    let mainNavItems = localStorage.getItem("mainNavItems");
    this.mainNavItems =  mainNavItems ? JSON.parse(mainNavItems) : [];
  }

  ngOnDestroy(){
  }

  navigateTo(route: {label: string, url: string, active: boolean}) {
    this.router.navigateByUrl(route.url);
    this.mainNavItems.map((item) => {
      item.active = route.label == item.label ? true : false;
      localStorage.setItem("bannerText", route.label);
      this.bannerText = route.label;
    })    
  }

  signOut() {
    localStorage.setItem("userType", "");
    localStorage.setItem("mainNavItems", "");
    localStorage.setItem("headerVisible", "");
    localStorage.setItem("token", "");
    localStorage.setItem("user", "");
    localStorage.setItem("bannerText", "");
    this.router.navigateByUrl('/signin');
    this.authService.user = null;
    this.bannerText = "";
  }

}
