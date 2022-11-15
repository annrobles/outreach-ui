import { UntilDestroy } from '@ngneat/until-destroy';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';
import { JobService } from '../../../services/job.service';
import { Job } from '../../../models/job.model';

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
    private jobSvc: JobService
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
}
