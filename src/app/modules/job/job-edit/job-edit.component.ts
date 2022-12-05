import { UntilDestroy } from '@ngneat/until-destroy';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';
import { JobService } from '../../../services/job.service';
import { Job } from '../../../models/job.model';
import { MessageService } from 'primeng/api';
@UntilDestroy()
@Component({
  selector: 'job-edit',
  templateUrl: './job-edit.component.html',
  styleUrls: ['./job-edit.component.less']
})
export class JobEditComponent implements OnInit, OnDestroy {

  job: Job;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authSvc: AuthService,
    private jobSvc: JobService,
    private messageSvc : MessageService
  ) {
    let id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.jobSvc.getById(parseInt(id)).subscribe((result) => {
        this.job = result.jobs;
      })
    }
  }

  ngOnInit(): void {
  }

  ngOnDestroy(){
  }

  onJobUpdate(eventData: { job: Job }) {
    let payload: any = eventData.job;
    payload.user_id = this.authSvc.user.id;
    
    this.jobSvc.update(payload.id,payload).subscribe(
      (result) => {
        if (result.status) {
          this.messageSvc.add({severity:'success', summary: result.message});
          this.router.navigateByUrl('/job');
        }
      },
      (errors) => {
        if (errors["error"].hasOwnProperty("errors")) {
          this.messageSvc.add({severity:'error', summary: errors["error"]["errors"]["email"][0]});
        }
        else {
          this.messageSvc.add({severity:'error', summary: errors["error"].message});
        }
      }
    );
  }
}
