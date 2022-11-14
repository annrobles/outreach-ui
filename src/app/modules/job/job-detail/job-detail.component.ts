import { UntilDestroy } from '@ngneat/until-destroy';
import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';
import { Job } from '../../../models/job.model';
import { UserAccessType } from "../../../models/user-access-type.enum";

@UntilDestroy()
@Component({
  selector: 'job-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.less']
})
export class JobDetailComponent implements OnInit, OnDestroy {

  @Output() jobSubmitted = new EventEmitter<{job: Job}>();
  @Input() isNew: boolean = false;
  @Input() job: Job =  {
    name: "",
    description: ""
  }


  userType: number =  UserAccessType.None;
  userAccessType = UserAccessType;

  constructor(
    private router: Router,
    private authSvc: AuthService
  ) {

  }

  ngOnInit(): void {
  }

  ngOnDestroy(){
  }

  jobSubmit() {
    this.jobSubmitted.emit({ job: this.job });
  }
}
