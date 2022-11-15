import { UntilDestroy } from '@ngneat/until-destroy';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { UserAccessType } from "../../../../models/user-access-type.enum";
import { AuthService } from '../../../../services/auth.service';
import { StudentService } from "../../../../services/student.service";
import { MessageService } from 'primeng/api';
@UntilDestroy()
@Component({
  selector: 'student-view',
  templateUrl: './student-view.component.html',
  styleUrls: ['./student-view.component.less']
})
export class StudentViewComponent implements OnInit, OnDestroy {

  userAccessType = UserAccessType;
  userType: number =  UserAccessType.None;
  userId: number = 0;
  showAddCompanyButton: boolean = false;
  userInfo: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authSvc: AuthService,
    private studentSvc: StudentService,
    private messageSvc : MessageService
  ) {
   }

  ngOnInit(): void {
    this.userType = this.authSvc.user.user_type_id;
    if (this.userType == UserAccessType.Admin) {
      this.showAddCompanyButton = false;
    }

    let id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.userId = parseInt(id);
      this.studentSvc.getById(this.userId).subscribe((result) => {
        if (result.status) {
          this.userInfo = result.student;
        }
      })
    }
  }

  ngOnDestroy(){
  }

  update(userInfo: any) {
    this.studentSvc.update(this.userId, userInfo).subscribe(
      (result) => {
        if (result.status) {
          this.messageSvc.add({severity:'success', summary: result.message});
          this.userInfo = result.student;
        }
      },
      (errors) => {
        if (errors["error"].hasOwnProperty("errors")) {
          this.messageSvc.add({severity:'error', summary: errors["error"]["errors"]["email"][0]});
        }
        else {
          this.messageSvc.add({severity:'error', summary: errors["error"].message});
        }
      }
    );
  }
}
