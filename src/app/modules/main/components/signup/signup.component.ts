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

  name?: string;
  validPassword: boolean = false;
  user_type_id: number = 3;
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
    this.signupService.signup({email: this.email, name: this.name, user_type_id: this.user_type_id}).subscribe(
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
