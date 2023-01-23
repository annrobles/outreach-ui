import { UntilDestroy } from '@ngneat/until-destroy';
import { Component, OnInit, OnDestroy } from '@angular/core';

@UntilDestroy()
@Component({
  selector: 'privacy',
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.less']
})
export class PrivacyComponent implements OnInit, OnDestroy {

  constructor(
  ) { }

  ngOnInit(): void {  
  }

  ngOnDestroy(){
  }

}

