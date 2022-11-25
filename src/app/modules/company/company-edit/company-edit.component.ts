import { UntilDestroy } from '@ngneat/until-destroy';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Company } from '../../../models/company.model';
import { CompanyService } from '../../../services/company.service';
import { MessageService } from 'primeng/api';

@UntilDestroy()
@Component({
  selector: 'company-edit',
  templateUrl: './company-edit.component.html',
  styleUrls: ['./company-edit.component.less']
})
export class CompanyEditComponent implements OnInit, OnDestroy {

  company:Company;
  isLoading: boolean = true;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private companySvc: CompanyService,
    private messageService: MessageService,
  ) {
    let id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.companySvc.getById(parseInt(id)).subscribe((result) => {
        if (result.status) {
          this.company = result.company;
          this.company.source = JSON.parse(result.company.source);
        }
        this.isLoading = false;
      })
    }
   }

  ngOnInit(): void {
  }

  ngOnDestroy(){
  }

  onCompanyUpdate(eventData: { company: Company }) {
    let payload: any = eventData.company;
    payload.source = JSON.stringify(eventData.company.source);
    if (this.company.id) {
      this.companySvc.update(this.company.id, payload).subscribe(
        (result) => {
          if (result.status) {
            this.messageService.add({severity:'success', summary: result.message});
            this.router.navigateByUrl('/company');
          }
        },
        (errors) => {
          if (errors["error"].hasOwnProperty("errors")) {
            this.messageService.add({severity:'error', summary: errors["error"]["errors"]["email"][0]});
          }
          else {
            this.messageService.add({severity:'error', summary: errors["error"].message});
          }
        }
      );
    }
  }

}
