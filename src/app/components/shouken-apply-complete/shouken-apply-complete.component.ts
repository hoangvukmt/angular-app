import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { BaseCpnComponent } from '../../core/base-cpn/base-cpn.component';

@Component({
  selector: 'app-shouken-apply-complete',
  templateUrl: './shouken-apply-complete.component.html',
  styleUrls: ['./shouken-apply-complete.component.css']
})
export class ShoukenApplyCompleteComponent extends BaseCpnComponent implements OnInit {

  constructor(public translate: TranslateService) {
    super(translate, 'shouken-apply');
  }

  ngOnInit() {
  }

  doCancel(): void {
    window.location.href = '/shouken-list';
  }

  doNext(): void {
    window.location.href = '/shouken-list';
  }

}
