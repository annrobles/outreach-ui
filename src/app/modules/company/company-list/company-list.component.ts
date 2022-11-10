import { UntilDestroy } from '@ngneat/until-destroy';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Router } from '@angular/router';

import { Company } from '../../../models/company.model';
import { CompanyStatus } from '../../../models/company-status.enum';
import { UserAccessType } from "../../../models/user-access-type.enum";
import { CompanyService } from '../../../services/company.service';

@UntilDestroy()
@Component({
  selector: 'company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.less']
})
export class CompanyListComponent implements OnInit, OnDestroy {

  @Input() companyHeader: string = "List of Companies";
  @Input() showAddApplicantButton: boolean = false;
  @Input() showAddCompanyButton: boolean = true;

  userAccessType = UserAccessType;
  userType: number =  UserAccessType.None;

  companies:Company[] = [];

  CompanyStatus = CompanyStatus;

  statuses: any[];
  loading: boolean = false;

  constructor(
    private router: Router,
    private companySvc: CompanyService
  ) {

    this.userType = parseInt(localStorage.getItem("userType") || "");

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
    this.companySvc.getList().subscribe((result) => {
      if (result.status) {
        this.companies = result.company;
      }
    })
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
}
