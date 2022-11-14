import { UntilDestroy } from '@ngneat/until-destroy';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';
import { JobService } from '../../../services/job.service';
import { MessageService } from 'primeng/api';
import { Job } from '../../../models/job.model';

@UntilDestroy()
@Component({
  selector: 'job-add',
  templateUrl: './job-add.component.html',
  styleUrls: ['./job-add.component.less']
})
export class JobAddComponent implements OnInit, OnDestroy {

  constructor(
    private router: Router,
    private authSvc: AuthService,
    private jobSvc: JobService,
    private messageService: MessageService
  ) {

  }

  ngOnInit(): void {
  }

  ngOnDestroy(){
  }

  onJobAdded(eventData: { job: Job }) {
    let payload: any = eventData.job;
    payload.user_id = this.authSvc.user.id;
    
    this.jobSvc.add(payload).subscribe(
      (result) => {
        if (result.status) {
          this.messageService.add({severity:'success', summary: result.message});
          this.router.navigateByUrl('/job');
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
