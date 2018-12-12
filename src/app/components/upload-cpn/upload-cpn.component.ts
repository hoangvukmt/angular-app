import { Component, OnInit, AfterViewInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { BaseCpnComponent } from '../../core/base-cpn/base-cpn.component';

declare var $: any;
@Component({
  selector: 'app-upload-cpn',
  templateUrl: './upload-cpn.component.html',
  styleUrls: ['./upload-cpn.component.css']
})
export class UploadCpnComponent extends BaseCpnComponent implements OnInit, AfterViewInit {

  constructor(public translate: TranslateService) {
    super(translate, 'upload');
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    $.getScript('assets/js/custom.js', function() {});
  }
}
