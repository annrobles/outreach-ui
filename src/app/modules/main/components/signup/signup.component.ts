import { UntilDestroy } from '@ngneat/until-destroy';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { SignupService } from '../../../../services/signup.service'
import { UserAccessType } from "../../../../models/user-access-type.enum";
import { MessageService } from 'primeng/api';
@UntilDestroy()
@Component({
  selector: 'signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.less']
})
export class SignupComponent implements OnInit, OnDestroy {

  password?: string;
  validPassword: boolean = false;

  email?: string;
  isEmployer: boolean = false;
  loadingOpacity = 0;

  private pwRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\d$@$!%*?&.])[A-Za-z\d$@$!%*?&.]{7,}/;

  constructor(
    private signupService: SignupService,
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService
  ) {
    this.route.queryParams
    .subscribe(params => {
      console.log(params);
      if (params) {
        this.isEmployer = params["employer"];
      }
    });
   }

  ngOnInit(): void {

  }

  ngOnDestroy(){
  }

  validatePassword() {
    //this.validPassword = this.pwRegex.test(this.password as string);
    this.validPassword = true;
  }

  signupClick() {
    let user_type_id = UserAccessType.Student;

    if (this.isEmployer) {
      user_type_id = UserAccessType.Company;
    }

    this.signupService.signup({email: this.email, password: this.password, user_type_id: user_type_id}).subscribe(
      (result) => {
        if (result.status) {
          if (result.status) {
            this.messageService.add({severity:'success', summary: result.message});
            this.router.navigateByUrl('/signin');
          }
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
