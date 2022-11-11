import { UntilDestroy } from '@ngneat/until-destroy';
import { Component, OnInit, OnDestroy, Output, EventEmitter, Input } from '@angular/core';
import { Router } from '@angular/router';

import { Company, CompanySkillsetNeed } from '../../../models/company.model';
import { CompanyStatus } from '../../../models/company-status.enum';
import { UserAccessType } from "../../../models/user-access-type.enum";
import { AuthService } from '../../../services/auth.service';
import { SkillsetService } from "../../../services/skillset.service";

@UntilDestroy()
@Component({
  selector: 'company-detail',
  templateUrl: './company-detail.component.html',
  styleUrls: ['./company-detail.component.less']
})
export class CompanyDetailComponent implements OnInit, OnDestroy {

  @Output() companySubmitted = new EventEmitter<{company: Company}>();
  @Input() isNew: boolean = false;
  @Input() company: Company =  {
    name: "",
    about: "",
    link: "",
    email: "",
    contact_number: "",
    status: CompanyStatus.New,
    availability: {
      morning: false,
      afternoon: false,
      evening: false
    },
    companySkillsetNeed: []
  }

  CompanyStatus = CompanyStatus;
  companyStatuses: string[] = [];
  showStatusDropDown: boolean = false;
  userType: number =  UserAccessType.None;
  userAccessType = UserAccessType;
  statuses: any[] = [];
  skillsets: any[] = [];
  selectedSkillset: {id: number, name: string, total_years_experience: number} = {id: 0, name: "", total_years_experience: 0};
  total_years_experience: number = 0;

  constructor(
    private router: Router,
    private authSvc: AuthService,
    private skillsetSvc: SkillsetService
  ) { }

  ngOnInit(): void {
    this.userType = this.authSvc.user.userType;

    this.statuses = [
      {label: 'Unqualified', value: 5},
      {label: 'Qualified', value: 6},
      {label: 'New', value: 1},
      {label: 'Negotiation', value: 7},
      {label: 'Proposal', value: 8},
      {label: 'Contacted', value: 2}
    ];

    this.skillsetSvc.getList().subscribe((result) => {
      if (result.status) {
        this.skillsets = result.skillset;
      }
    })
  }

  ngOnDestroy(){
  }

  companySubmit() {
    this.companySubmitted.emit({ company: this.company });
  }

  statusChanged(statusIndex: number) {
    this.company.status = statusIndex;
    this.showStatusDropDown = false;
  }

  addSkill() {
    this.selectedSkillset.total_years_experience = this.total_years_experience;
    this.company.companySkillsetNeed?.push(this.selectedSkillset);
  }

  removeSkill(skill: CompanySkillsetNeed) {
    
  }
}
