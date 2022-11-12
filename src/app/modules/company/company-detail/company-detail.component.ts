import { UntilDestroy } from '@ngneat/until-destroy';
import { Component, OnInit, OnDestroy, Output, EventEmitter, Input } from '@angular/core';
import { Router } from '@angular/router';

import { Company, CompanySkillsets } from '../../../models/company.model';
import { CompanyStatus } from '../../../models/company-status.enum';
import { UserAccessType } from "../../../models/user-access-type.enum";
import { AuthService } from '../../../services/auth.service';
import { SkillsetService } from "../../../services/skillset.service";
import { CompanySkillsetService } from "../../../services/company-skillset.service";
import { MessageService } from 'primeng/api';

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
    job_description: "",
    link: "",
    email: "",
    contact_number: "",
    status: CompanyStatus.New,
    source: {
      placement: true,
      coop: true,
      other: false
    },
    other_specify: "",
    skillsets: []
  }

  CompanyStatus = CompanyStatus;
  companyStatuses: string[] = [];
  showStatusDropDown: boolean = false;
  userType: number =  UserAccessType.None;
  userAccessType = UserAccessType;
  statuses: any[] = [];
  skillsets: any[] = [];
  selectedSkillset: {id: number, name: string, total_years_experience: number | null} = {id: 0, name: "", total_years_experience: null};
  total_years_experience: number | null = null;

  constructor(
    private router: Router,
    private authSvc: AuthService,
    private skillsetSvc: SkillsetService,
    private companySkillsetSvc : CompanySkillsetService,
    private messageService: MessageService,
  ) { }

  ngOnInit(): void {
    this.userType = this.authSvc.user.user_type_id;

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
    });
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
    this.company.skillsets?.push({
      skillset_id: this.selectedSkillset.id,
      name: this.selectedSkillset.name,
      total_years_experience: this.total_years_experience,
      skill: this.selectedSkillset
    });
    
    this.companySkillsetSvc.add({
      company_id: this.company.id,
      skillset_id: this.selectedSkillset.id,
      name: this.selectedSkillset.name,
      total_years_experience: this.total_years_experience
    }).subscribe((result) => {
      if (result.status) {
        this.messageService.add({severity:'success', summary: result.message});
        this.selectedSkillset = {
          id: 0,
          name: "",
          total_years_experience: null
        }
        this.total_years_experience = null;
      }
    });
  }

  removeSkill(skill: CompanySkillsets) {
    
  }
}
