import { UntilDestroy } from '@ngneat/until-destroy';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';
import { UserProfileNavItem } from "../../../../models/user-profile-interface";

@UntilDestroy()
@Component({
  selector: 'student-detail',
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.less']
})
export class StudentDetailComponent implements OnInit, OnDestroy {

  userProfileNavItems = [
    {name: "Basic Information", link: "/dashboard/user-profile/basic-info", active: true},
    {name: "Skills", link: "/dashboard/user-profile/skills", active: false}
  ];

  studentDetailHeader: string = "Basic Information";

  constructor(
    private router: Router
  ) {

    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        // Show progress spinner or progress bar
      }

      if (event instanceof NavigationEnd) { 
        if (event.url == "/dashboard/user-profile/skills") {
          this.studentDetailHeader = "Skills";
        } else {
          this.studentDetailHeader = "Basic Information";
        }
      }
    });
  }

  ngOnInit(): void {

  }

  ngOnDestroy(){
  }

  navItemClick(selectedItem: UserProfileNavItem) {
    this.router.navigateByUrl(selectedItem.link);
    this.userProfileNavItems.map((item) => {
      item.active = selectedItem.name == item.name ? true : false;
    })
  }

}

