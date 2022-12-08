import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';


import { UserAccessType, Roles } from "../models/user-access-type.enum";

import { MainService } from "./main.service";

@Injectable()
export class AuthService extends MainService {
  endpoint: string;
  user_type: UserAccessType = UserAccessType.None;
  mainNavItems: {label: string, url: string, active: boolean}[] = [];
  user:any;
  username: string;
  userTypeChange: Subject<number> = new Subject<number>();
  mainNavItemsChange: Subject<{label: string, url: string, active: boolean}[]>
  = new Subject<{label: string, url: string, active: boolean}[]>();

  constructor(
    http: HttpClient
    ) {
      super(http);
      this.endpoint = 'auth/register';

      this.userTypeChange.subscribe((value) => {
        this.user_type = value;
      });

      this.mainNavItemsChange.subscribe((value) => {
        this.mainNavItems = value;
      });

      let userInfo = localStorage.getItem("user"); 
      if (userInfo) {
        this.user = JSON.parse(userInfo);
      }
    }

  setUserType(user_type: UserAccessType) {
    this.user_type = user_type;
    this.userTypeChange.next(user_type);

    if (this.user_type == UserAccessType.Student) {
      this.mainNavItems = [
        {label: "User Info", url: "/user-info", active: true},
        {label: "Companies", url: "/company", active: false},
        {label: "Sign out", url: "/signin", active: false}
      ];
    }

    if (this.user_type == UserAccessType.Admin) {
      this.mainNavItems = [
        {label: "Candidates", url: "/student-list", active: true},
        {label: "Companies", url: "/company", active: false},
        {label: "Employees", url: "/employee", active: false},
        {label: "Sign out", url: "/signin", active: false}
      ]
    }

    if (this.user_type == UserAccessType.Company) {
      this.mainNavItems = [        
        {label: "Jobs", url: "/job", active: true},
        {label: "Candidates", url: "/student-list", active: false},
        {label: "Sign out", url: "/signin", active: false}
      ]
    }

    this.mainNavItemsChange.next(this.mainNavItems);
    localStorage.setItem("mainNavItems", `${JSON.stringify(this.mainNavItems)}`);
  }

  getUserType() {
    return this.user_type;
  }

  getUserRole(): string {
    let userType = localStorage.getItem('userType')

    if (userType != null) {
    return UserAccessType[parseInt(userType)];
    }

    return "";
  }


  areUserRolesAllowed(userRoles: string[], allowedUserRoles: Roles[]): boolean {
    if (allowedUserRoles.length == 0) {
      return true;
    }
    for (const role of userRoles) {
      for (const allowedRole of allowedUserRoles) {
        if (role.toLowerCase() === allowedRole.toLowerCase()) {
          return true;
        }
      }
    }
    return false;
  }

  isLoggedIn() {
    let token = localStorage.getItem('token')

    if (token != null) {
      return true;
    }

    return false;
  }

}


