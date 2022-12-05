import { UntilDestroy } from '@ngneat/until-destroy';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Router } from '@angular/router';

import { Company } from '../../../models/company.model';
import { CompanyStatus } from '../../../models/company-status.enum';
import { UserAccessType } from "../../../models/user-access-type.enum";
import { CompanyService } from '../../../services/company.service';
import { StudentService } from 'src/app/services/student.service';
import { AuthService } from 'src/app/services/auth.service';
import { MessageService } from 'primeng/api';

@UntilDestroy()
@Component({
  selector: 'company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.less']
})
export class CompanyListComponent implements OnInit, OnDestroy {

  @Input() companyHeader: string = "List of Companies";
  @Input() showAddCompanyButton: boolean = true;
  @Input() adminViewingUser: boolean = false;
  @Input() userId: number = 0;

  userAccessType = UserAccessType;
  userType: number =  UserAccessType.None;

  companies:Company[] = [];

  CompanyStatus = CompanyStatus;

  statuses: any[];
  loading: boolean = false;

  constructor(
    private router: Router,
    private companySvc: CompanyService,
    private studentSvc: StudentService,
    private authSvc: AuthService,
    private messageSvc : MessageService
  ) {

    this.userType = this.authSvc.user.user_type_id;

    this.statuses = [
        {label: 'Unqualified', value: 5},
        {label: 'Qualified', value: 6},
        {label: 'New', value: 1},
        {label: 'Negotiation', value: 7},
        {label: 'Proposal', value: 8},
        {label: 'Contacted', value: 2}
    ]

  }

  clear(table: any) {
    table.clear();
  }

  ngOnInit(): void {
    this.loading = true;
    if (this.userType == UserAccessType.Student || this.adminViewingUser) {
      let id = this.adminViewingUser ? this.userId : this.authSvc.user.student.id;
      this.studentSvc.getById(id).subscribe((result) => {
        if (result.status) {
          this.companies = result.student.companies;
          this.companies.map((company) => {
            if (company.student) {
              company.submittedBy = company.student.first_name + " " + company.student.last_name;
            }
          })
          this.loading = false;
        }
      })
    }
    else if (this.userType == UserAccessType.Admin) {
      this.companySvc.getList().subscribe((result) => {
        if (result.status) {
          this.companies = result.company;
          this.companies.map((company) => {
            if (company.student) {
              company.submittedBy = company.student.first_name + " " + company.student.last_name;
            }
          })
          this.loading = false;
        }
      })
    }
  }

  ngOnDestroy(){
  }

  addCompany() {
    this.router.navigateByUrl('/company/add');
  }

  viewCompany(company: Company) {
    this.router.navigateByUrl('/company/edit/' + company.id);
  }

  getSearchInputValue(event: any){
    return (event.target as HTMLInputElement).value;
  }

  deleteCompany(company: Company) {
    if (company.id) {
      this.companySvc.deleteById(company.id).subscribe((result) => {
        if (result.status) {
          this.companies = this.companies.filter(item => item.id != company.id);
          this.messageSvc.add({severity:'success', summary: result.message});
        }
      })
    }
  }
}
