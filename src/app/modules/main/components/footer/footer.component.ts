import { UntilDestroy } from '@ngneat/until-destroy';
import { Component, OnInit, OnDestroy } from '@angular/core';

@UntilDestroy()
@Component({
  selector: 'footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.less']
})
export class FooterComponent implements OnInit, OnDestroy {
    constructor(
      ) {
    }

    ngOnInit(): void {
    }

    ngOnDestroy(){
    }
}
