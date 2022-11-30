import { UntilDestroy } from '@ngneat/until-destroy';
import { Component, OnInit, OnDestroy } from '@angular/core'
import { Router, ActivatedRoute, Event, NavigationStart, NavigationEnd } from '@angular/router';

import { Company } from '../../../models/company.model';
import { CompanyService } from '../../../services/company.service';
import { MessageService } from 'primeng/api';
import { MenuItem } from 'primeng/api';

@UntilDestroy()
@Component({
  selector: 'company-edit',
  templateUrl: './company-edit.component.html',
  styleUrls: ['./company-edit.component.less']
})
export class CompanyEditComponent implements OnInit, OnDestroy {

  company:Company;
  isLoading: boolean = true;
  breadcrumbs: MenuItem[] = [];

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
          this.breadcrumbs.push({label: this.company.name}); 
        }
        this.isLoading = false;
      })

      this.router.events.subscribe((event: Event) => {
        if (event instanceof NavigationStart) {
          // Show progress spinner or progress bar
        }

        if (event instanceof NavigationEnd) {        
          let url = event.url.split("/");
  
          for (let index = 1; index < url.length; index++) {
            if (index != url.length-1) {
              if (index == 1) {
                this.breadcrumbs.push({label: url[index], url: "./company"});
              } else {
                this.breadcrumbs.push({label: url[index]});
              }              
            }        
          }
        }
      });
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
