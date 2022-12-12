import { UntilDestroy } from '@ngneat/until-destroy';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Router } from '@angular/router';

import { UserAccessType } from "../../../models/user-access-type.enum";
import { EmployeeService } from '../../../services/employee.service';
import { AuthService } from 'src/app/services/auth.service';
import { Employee } from '../../../models/employee.model';
import { MessageService } from 'primeng/api';

@UntilDestroy()
@Component({
  selector: 'employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.less']
})
export class EmployeeListComponent implements OnInit, OnDestroy {

  userAccessType = UserAccessType;
  userType: number =  UserAccessType.None;
  loading: boolean = false;
  employees: Employee[] = [];
  enable: any[];

  constructor(
    private router: Router,
    private authSvc: AuthService,
    private employeeSvc: EmployeeService,
    private messageSvc : MessageService
  ) {
    this.enable = [{label: "Enable", value: 1}, {label: "Disable", value: 0}];
  }

  ngOnInit(): void {
    let users: Employee[] = [];
    this.loading = true;
    if (this.authSvc.user) {
      this.userType = this.authSvc.user.user_type_id;

      this.employeeSvc.getList().subscribe((result) => {
        if (result.status) {
          users = result.users;
          this.employees = users.filter((item) => item.user_type_id == this.userAccessType.Company);
          this.loading = false;
        }
      })  
    }
  }

  ngOnDestroy(){
  }

  getSearchInputValue(event: any){
    return (event.target as HTMLInputElement).value;
  }

  viewEmployee() {
    // employee: Employee
    // this.router.navigateByUrl('/job/edit/' + employee.id);
  }

  disableEmployee(employee: Employee, rowIndex: number) {
    if (employee.id) {
      this.loading = true;
      this.employeeSvc.update(employee.id, {"enable":0}).subscribe((result) => {
        if (result.status) {
          this.messageSvc.add({severity:'success', summary: result.message});
          this.loading = false;          
          this.employees[rowIndex].enable = 0;
        }
      })  
    }
  }

  enableEmployee(employee: Employee, rowIndex: number) {
    if (employee.id) {
      this.loading = true;
      this.employeeSvc.update(employee.id, {"enable":1}).subscribe((result) => {
        if (result.status) {
          this.messageSvc.add({severity:'success', summary: result.message});
          this.loading = false;
          this.employees[rowIndex].enable = 1;
        }
      })  
    }
  }

}
