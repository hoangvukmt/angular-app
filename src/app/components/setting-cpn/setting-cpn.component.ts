import { Component, OnInit, AfterViewInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

import { BaseCpnComponent } from '../../core/base-cpn/base-cpn.component';
import { GlobalsHome } from './../../core/service/global-variables';

declare var $: any;
@Component({
  selector: 'app-setting-cpn',
  templateUrl: './setting-cpn.component.html',
  styleUrls: ['./setting-cpn.component.css']
})
export class SettingCpnComponent extends BaseCpnComponent implements OnInit, AfterViewInit {
  headerTitle = '設定';

  constructor(
    private router: Router,
    public translate: TranslateService,
    public globalsHome: GlobalsHome
  ) {
    super(translate, 'setting');
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    $.getScript('assets/js/custom.js', function() {});
  }

  goDetail(id: number): void {
    if (id === 6) {
      this.globalsHome.currentUrl = this.router.url;
      this.router.navigate(['/' + this.ROUTER_URL.changePass]);
    }
    else {
      this.router.navigate(['/' + this.ROUTER_URL.settingInfo + "/" + id]);
    }
  }
}
