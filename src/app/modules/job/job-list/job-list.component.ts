import { UntilDestroy } from '@ngneat/until-destroy';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Router } from '@angular/router';

import { UserAccessType } from "../../../models/user-access-type.enum";
import { JobService } from '../../../services/job.service';
import { AuthService } from 'src/app/services/auth.service';
import { Job } from '../../../models/job.model';

@UntilDestroy()
@Component({
  selector: 'job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.less']
})
export class JobListComponent implements OnInit, OnDestroy {

  userAccessType = UserAccessType;
  userType: number =  UserAccessType.None;
  loading: boolean = false;
  jobs: Job[] = [];

  constructor(
    private router: Router,
    private authSvc: AuthService,
    private jobSvc: JobService
  ) {

  }

  ngOnInit(): void {
    if (this.authSvc.user) {
      this.userType = this.authSvc.user.user_type_id;

      this.jobSvc.getById(this.authSvc.user.id).subscribe((result) => {
        if (result.status) {
          this.jobs = result.jobs;
        }
      })
    } else {
      this.jobSvc.getList().subscribe((result) => {
        if (result.status) {
          this.jobs = result.jobs;
        }
      })
    }
    
  }

  ngOnDestroy(){
  }

  getSearchInputValue(event: any){
    return (event.target as HTMLInputElement).value;
  }

  addJob() {
    this.router.navigateByUrl('/job/add');
  }

  viewJob(job: Job) {
    this.router.navigateByUrl('/job/edit/' + job.id);
  }
}