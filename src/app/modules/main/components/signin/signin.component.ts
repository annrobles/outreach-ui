import { UntilDestroy } from '@ngneat/until-destroy';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { SigninService } from '../../../../services/signin.service';
import { HeaderService } from '../../../../services/header.service';
import { AuthService } from "../../../../services/auth.service";
import { UserAccessType } from 'src/app/models/user-access-type.enum';
import { MessageService } from 'primeng/api';

@UntilDestroy()
@Component({
  selector: 'signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.less']
})
export class SigninComponent implements OnInit, OnDestroy {

  email: string = "";
  password:string = "";

  constructor(
    private authService: AuthService,
    private headerService: HeaderService,
    private signinService: SigninService,
    private messageService: MessageService,
    private router: Router
  ) { }

  ngOnInit(): void {

  }

  ngOnDestroy(){
  }

  signupClick() {
    this.router.navigateByUrl('/signup');
  }

  signinClick() {
    this.signinService.signin({email: this.email, password: this.password}).subscribe(
      (result) => {
        if (result.status) {
          this.authService.setUserType(result.user.user_type_id);
          this.headerService.toggleHeaderVisibility(true);
          localStorage.setItem("headerVisible", "true");
          localStorage.setItem("userType", `${result.user.user_type_id}`);
          localStorage.setItem("token", `${result.token}`);
          localStorage.setItem("user", `${JSON.stringify(result.user)}`);
          this.authService.user = result.user;
          if (result.user.user_type_id == UserAccessType.Student) {
            this.router.navigateByUrl('/user-info');
          }
          else if (result.user.user_type_id == UserAccessType.Admin) {
            this.router.navigateByUrl('/student-list');
          }
          else if (result.user.user_type_id == UserAccessType.Company) {
            this.router.navigateByUrl('/job');
          }
          this.messageService.add({severity:'success', summary: result.message});
        } else {
          this.messageService.add({severity:'error', summary: result.message});
        }
      },
      (errors) => {
        if (errors["error"].hasOwnProperty("errors")) {
          this.messageService.add({severity:'error', summary: errors["error"]["errors"]["email"][0]});
        }
        else {
          this.messageService.add({severity:'error', summary: errors["error"].message});
        }
      }
    );
  }

}
