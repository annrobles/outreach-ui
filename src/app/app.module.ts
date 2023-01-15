import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { EditorModule } from 'primeng/editor';
import { InputNumberModule } from 'primeng/inputnumber';
import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { MultiSelectModule } from 'primeng/multiselect';
import { ProgressBarModule } from 'primeng/progressbar';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CheckboxModule } from 'primeng/checkbox';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CompanyAddComponent } from "./modules/company/company-add/company-add.component";
import { CompanyDetailComponent } from "./modules/company/company-detail/company-detail.component";
import { CompanyEditComponent } from "./modules/company/company-edit/company-edit.component";
import { CompanyListComponent } from "./modules/company/company-list/company-list.component";
import { HeaderComponent } from "./modules/main/components/header/header.component";
import { FooterComponent } from "./modules/main/components/footer/footer.component";
import { SigninComponent } from "./modules/main/components/signin/signin.component";
import { SignupComponent } from './modules/main/components/signup/signup.component';
import { PasswordComponent } from './modules/main/components/password/password.component';
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

import { AuthService } from './services/auth.service';
import { CompanyService } from "./services/company.service";
import { HeaderService } from './services/header.service';
import { SigninService } from './services/signin.service';
import { SignupService } from './services/signup.service';
import { SkillsetService } from "./services/skillset.service";
import { StudentService } from './services/student.service';
import { StudentSkillsetService } from './services/student-skillset.service';
import { CompanySkillsetService } from "./services/company-skillset.service";
import { JobService } from './services/job.service';
import { EmployeeService } from './services/employee.service';
import { CollegeService } from './services/college.service';
import { UserService } from './services/user.service';
import { AuthGuard } from "./core/auth.guard";
@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AvatarModule,
    AvatarGroupModule,
    ButtonModule,
    DropdownModule,
    EditorModule,
    InputNumberModule,
    MenuModule,
    MenubarModule,
    MessageModule,
    MessagesModule,
    MultiSelectModule,
    ProgressBarModule,
    TableModule,
    ToastModule,
    ProgressSpinnerModule,
    BreadcrumbModule,
    RadioButtonModule,
    CheckboxModule
  ],
  exports: [
    StudentDetailComponent,
    CompanyListComponent,
    JobDetailComponent
  ],
  declarations: [
    AppComponent,
    CompanyAddComponent,
    CompanyEditComponent,
    CompanyDetailComponent,
    CompanyListComponent,
    HeaderComponent,
    FooterComponent,
    SigninComponent,
    SignupComponent,
    PasswordComponent,
    StudentDetailComponent,
    StudentListComponent,
    StudentViewComponent,
    UserProfileComponent,
    UserVerificationComponent,
    JobDetailComponent,
    JobAddComponent,
    JobEditComponent,
    JobListComponent,
    EmployeeListComponent,
    ShortListComponent
  ],
  providers: [
    AuthGuard,
    AuthService,
    CompanyService,
    HeaderService,
    SigninService,
    SignupService,
    SkillsetService,
    StudentService,
    StudentSkillsetService,
    CompanySkillsetService,
    JobService,
    EmployeeService,
    CollegeService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
