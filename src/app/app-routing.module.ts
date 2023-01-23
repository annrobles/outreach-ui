import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from "./core/auth.guard";

import { CompanyAddComponent } from "./modules/company/company-add/company-add.component";
import { CompanyEditComponent } from "./modules/company/company-edit/company-edit.component";
import { CompanyListComponent } from "./modules/company/company-list/company-list.component";
import { SigninComponent } from "./modules/main/components/signin/signin.component";
import { SignupComponent } from './modules/main/components/signup/signup.component';
import { StudentDetailComponent } from "./modules/student/components/student-detail/student-detail.component";
import { StudentListComponent } from "./modules/student/components/student-list/student-list.component";
import { StudentViewComponent } from "./modules/student/components/student-view/student-view.component";
import { UserProfileComponent } from "./modules/user-profile/user-profile.component";
import { UserVerificationComponent } from "./modules/main/components/user-verification/user-verification.component";
import { JobAddComponent } from './modules/job/job-add/job-add.component';
import { JobDetailComponent } from './modules/job/job-detail/job-detail.component';
import { JobEditComponent } from './modules/job/job-edit/job-edit.component';
import { JobListComponent } from './modules/job/job-list/job-list.component';
import { EmployeeListComponent } from './modules/employee/employee-list/employee-list.component';
import { ShortListComponent } from "./modules/student/components/short-list/short-list.component";
import { PasswordComponent } from './modules/main/components/password/password.component';
import { Roles } from './models/user-access-type.enum';
import { PrivacyComponent } from "./modules/main/pages/privacy/privacy.component";

const routes: Routes = [
  {
    path: '',
    data: { frameless: true },
    component: SigninComponent
  },
  {
    path: 'signin',
    data: { frameless: true },
    component: SigninComponent
  },
  {
    path: 'company',
    data: { frameless: true, userRoles: [] },
    component: CompanyListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'company/add',
    data: { frameless: true, userRoles: [] },
    component: CompanyAddComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'company/edit/:id',
    data: { frameless: true, userRoles: [] },
    component: CompanyEditComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'user-info',
    data: { frameless: true, userRoles: [] },
    component: UserProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'signup',
    data: { frameless: true },
    component: SignupComponent
  },
  {
    path: 'student-detail',
    data: { frameless: true, userRoles: [Roles.ADMIN, Roles.COMPANY] },
    component: StudentDetailComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'student-list',
    data: { frameless: true, userRoles: [Roles.ADMIN, Roles.COMPANY] },
    component: StudentListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'student-view/:id',
    data: { frameless: true, userRoles: [Roles.ADMIN, Roles.COMPANY] },
    component: StudentViewComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'user-verification',
    data: { frameless: true },
    component: UserVerificationComponent
  },
  {
    path: 'job',
    data: { frameless: true },
    component: JobListComponent
  },
  {
    path: 'job/add',
    data: { frameless: true, userRoles: [Roles.ADMIN, Roles.COMPANY] },
    component: JobAddComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'job/edit/:id',
    data: { frameless: true, userRoles: [] },
    component: JobEditComponent
  },
  {
    path: 'employee',
    data: { frameless: true, userRoles: [Roles.ADMIN] },
    component: EmployeeListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'update-password',
    data: { frameless: true, userRoles: [] },
    component: PasswordComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'short-list',
    data: { frameless: true, userRoles: [Roles.COMPANY] },
    component: ShortListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'privacy',
    data: { frameless: true, userRoles: [] },
    component: PrivacyComponent,
    canActivate: []
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
