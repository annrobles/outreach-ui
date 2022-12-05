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
  username: string = "";
  mainNavItems: {label: string, url: string, active: boolean}[] = [];
  headerVisible: boolean = false;
  jobPageheaderVisible: boolean = false;
  bannerText: string = "";
  interval: any;

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
          this.bannerText = "";
          this.mainNavItems.map((item) => {
            item.active = event.url  == item.url ? true : false;
          });
        }

        if (event.url == "/job" && this.userType == this.userAccessType.None) {
          this.jobPageheaderVisible = true;
          this.bannerText = "Career";
          this.mainNavItems = [
            {label: "Home", url: "https://appolizer.ca/index.php", active: false},
            {label: "Career", url: "http://nevisco.ca/outreach/job", active: true},
            {label: "Workspace", url: "https://appolizer.ca/workspace/index.php", active: false},
            {label: "Academia", url: "https://appolizer.ca/academia/Courses/index.php", active: false},
            {label: "Contact", url: "https://appolizer.ca/contact/index.php", active: false}
          ];
        }
      }
    });
   }

  ngOnInit(): void {
    this.bannerText = localStorage.getItem("bannerText") || "";

    this.headerVisible = localStorage.getItem("headerVisible") == "true" ? true : false;
    this.userType = parseInt(localStorage.getItem("userType") || "0");

    let mainNavItems = localStorage.getItem("mainNavItems");
    this.mainNavItems =  mainNavItems ? JSON.parse(mainNavItems) : [];

    this.interval = setInterval(() => {
      let username = localStorage.getItem("username");
      this.username = username ? username : "";
    },100);
  }

  ngOnDestroy(){
  }

  navigateTo(route: {label: string, url: string, active: boolean}) {
    if (this.jobPageheaderVisible) {
      window.location.href = route.url;
    }
    else {
      this.router.navigateByUrl(route.url);
      this.mainNavItems.map((item) => {
        item.active = route.label == item.label ? true : false;
        localStorage.setItem("bannerText", route.label);
        this.bannerText = route.label;
      })    
    }
  }

  signOut() {
    localStorage.setItem("userType", "");
    localStorage.setItem("mainNavItems", "");
    localStorage.setItem("headerVisible", "");
    localStorage.setItem("token", "");
    localStorage.setItem("user", "");
    localStorage.setItem("bannerText", "");
    localStorage.setItem("username", "");
    this.router.navigateByUrl('/signin');
    this.mainNavItems = [];
    this.authService.user = null;
    this.bannerText = "";
    this.username = "";
  }

}
