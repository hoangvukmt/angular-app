import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { BaseCpnComponent } from '../../core/base-cpn/base-cpn.component';

declare var $: any;
@Component({
  selector: 'app-setting-info-cpn',
  templateUrl: './setting-info-cpn.component.html',
  styleUrls: ['./setting-info-cpn.component.css']
})
export class SettingInfoCpnComponent extends BaseCpnComponent implements OnInit, AfterViewInit {
  headerTitle: string;
  id: number;
  constructor(
    private route: ActivatedRoute,
    public translate: TranslateService
  ) {
    super(translate, 'setting');
  }

  ngOnInit() {
    this.id = +this.route.snapshot.paramMap.get('id');
    switch (this.id) {
      case 1:
        this.headerTitle = "利用規約";
        break;
      case 2:
        this.headerTitle = "個人情報保護方針";
        break;
      case 3:
        this.headerTitle = "ライセンス";
        break;
      case 4:
        this.headerTitle = "チュートリアル";
        break;
      case 5:
        this.headerTitle = "バージョン情報";
        break;
    }
  }

  ngAfterViewInit() {
    $.getScript('assets/js/custom.js', function() {});
  }

}
