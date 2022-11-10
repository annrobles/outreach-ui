import { UntilDestroy } from '@ngneat/until-destroy';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Company } from '../../../models/company.model';
import { CompanyStatus } from '../../../models/company-status.enum';
import { CompanyService } from '../../../services/company.service';
import { MessageService } from 'primeng/api';

@UntilDestroy()
@Component({
  selector: 'company-edit',
  templateUrl: './company-edit.component.html',
  styleUrls: ['./company-edit.component.less']
})
export class CompanyEditComponent implements OnInit, OnDestroy {

  CompanyStatus = CompanyStatus;

  company:Company = {
      id: 2,
      name: "Company",
      email: "careers@company.com",
      contact_number: "613-555-0102",
      status: CompanyStatus.New,
      created_at: new Date("08-18-2022"),
      availability: {
        morning: true,
        afternoon: true,
        evening: false
      }
    }


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private companySvc: CompanyService,
    private messageService: MessageService,
  ) { }

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.companySvc.getById(parseInt(id)).subscribe((result) => {
        if (result.status) {
          this.company = result.company;
          this.company.availability = JSON.parse(result.company.availability);
        }
      })
    }
  }

  ngOnDestroy(){
  }

  onCompanyUpdate(eventData: { company: Company }) {
    let payload: any = eventData.company;
    payload.availability = JSON.stringify(eventData.company.availability);
    
    this.companySvc.update(payload).subscribe((result) => {
      if (result.status) {
        this.messageService.add({severity:'success', summary: result.message});
        this.router.navigateByUrl('/company');
      }
    });
  }

}
