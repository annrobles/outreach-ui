import { UntilDestroy } from '@ngneat/until-destroy';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { Company } from '../../../models/company.model';
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
    payload.source = JSON.stringify(eventData.company.source);
    payload.student_id = this.authSvc.user.student.id;

    this.companySvc.add(payload).subscribe((result) => {
      if (result.status) {
        this.messageService.add({severity:'success', summary: result.message});
        this.router.navigateByUrl('/company');
      }
    });
  }

}
