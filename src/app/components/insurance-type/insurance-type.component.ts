import { GlobalsHome } from './../../core/service/global-variables';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { BaseCpnComponent } from '../../core/base-cpn/base-cpn.component';
import { Router } from '@angular/router';

declare var $: any;
@Component({
  selector: 'app-insurance-type',
  templateUrl: './insurance-type.component.html',
  styleUrls: ['./insurance-type.component.css']
})
export class InsuranceTypeComponent extends BaseCpnComponent implements OnInit, AfterViewInit {
  headerTitle = '証券写真一覧　保険分類';

  constructor(public translate: TranslateService,
    public router: Router,
    public globalsHome: GlobalsHome) {
    super(translate, 'insurance-type');
  }

  ngOnInit() {
    this.globalsHome.category_id = 0;
  }

  ngAfterViewInit() {
    $.getScript('assets/js/custom.js', function() {});
  }

  doBack(): void {
    this.router.navigate(['/' + this.ROUTER_URL.shoukenList + '/' + this.globalsHome.group_id + '/true']);
  }

  goDetail(id: number): void {
    localStorage.setItem('categoryID', id.toString());
    this.globalsHome.category_id = id;
    this.globalsHome.isInsuranceType = true;
    localStorage.setItem('page-goto-edit', this.router.url);
    localStorage.removeItem('mockDataKeiyaku');
    this.router.navigate(['/' + this.ROUTER_URL.insuranceInfoEdit + '/0']);
  }
}
