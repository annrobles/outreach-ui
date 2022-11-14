import { UntilDestroy } from '@ngneat/until-destroy';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';

@UntilDestroy()
@Component({
  selector: 'job-edit',
  templateUrl: './job-edit.component.html',
  styleUrls: ['./job-edit.component.less']
})
export class JobEditComponent implements OnInit, OnDestroy {

  constructor(
    private router: Router,
    private authSvc: AuthService
  ) {

  }

  ngOnInit(): void {
  }

  ngOnDestroy(){
  }
}
