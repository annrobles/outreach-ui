import { UntilDestroy } from '@ngneat/until-destroy';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../../../services/auth.service';
import { UserService } from "../../../../services/user.service";
import { MessageService } from 'primeng/api';

@UntilDestroy()
@Component({
  selector: 'password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.less']
})
export class PasswordComponent implements OnInit, OnDestroy {

  new_password:string;
  confirm_password:string;

  constructor(
    private authSvc: AuthService,
    private userSvc: UserService,
    private messageSvc: MessageService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  ngOnDestroy(){
  }

  updatePasswordClick() {
    this.userSvc.update(this.authSvc.user.id, {password: this.new_password}).subscribe(
      (result) => {
        if (result.status) {
          this.messageSvc.add({severity:'success', summary: result.message});
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
