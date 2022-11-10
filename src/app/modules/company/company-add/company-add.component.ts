import { UntilDestroy } from '@ngneat/until-destroy';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { Company } from '../../../models/company.model';
import { CompanyStatus } from '../../../models/company-status.enum';
import { AuthService } from '../../../services/auth.service';
import { CompanyService } from '../../../services/company.service';
import { MessageService } from 'primeng/api';

@UntilDestroy()
@Component({
  selector: 'company-add',
  templateUrl: './company-add.component.html',
  styleUrls: ['./company-add.component.less']
})
export class CompanyAddComponent implements OnInit, OnDestroy {

  CompanyStatus = CompanyStatus;
  company:Company = {
    name: "",
    about: "",
    link: "",
    email: "",
    contact_number: "",
    status: CompanyStatus.New,
    user_id: this.authSvc.user.id,
    availability: {
      morning: false,
      afternoon: false,
      evening: false
    }
  }

  constructor(
    private router: Router,
    private authSvc: AuthService,
    private companySvc: CompanyService,
    private messageService: MessageService
  ) {
   }

  ngOnInit(): void {
  }

  ngOnDestroy(){
  }

  onCompanyAdded(eventData: { company: Company }) {
    let payload: any = eventData.company;
    payload.availability = JSON.stringify(eventData.company.availability);
    
    this.companySvc.add(payload).subscribe((result) => {
      if (result.status) {
        this.messageService.add({severity:'success', summary: result.message});
        this.router.navigateByUrl('/company');
      }
    });
  }

}
