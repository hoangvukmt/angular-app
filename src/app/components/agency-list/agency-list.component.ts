import { Component, OnInit, AfterViewInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';

import { HttpService } from '../../core/service/http.service';
import { BaseCpnComponent } from '../../core/base-cpn/base-cpn.component';
import { ConfirmCommonComponent } from '../popup/confirm-common/confirm-common.component';

declare var $: any;
@Component({
  selector: 'app-agency-list',
  templateUrl: './agency-list.component.html',
  styleUrls: ['./agency-list.component.css']
})
export class AgencyListComponent extends BaseCpnComponent implements OnInit, AfterViewInit {
  headerTitle = '代理店一覧';
  lstAgent = [];
  constructor(
    public dialog: MatDialog,
    private router: Router,
    public httpService: HttpService,
    public translate: TranslateService
  ) {
    super(translate, 'agency-info');
  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    $.getScript('assets/js/custom.js', function() {});
    this.getListAgent();
  }

  getListAgent(): void {
    const formData = {
      user_no: localStorage.getItem('user_no')
    };
    this.httpService.post(this.API_URLS.getListAgent, formData).subscribe(res => {
      if (res.code === this.RESULT_CODE.success) {
        this.lstAgent = res.data;
      } else {
        console.log(res);
      }
    });
  }

  doDelete(id: number, name: string) {
    const dialogCompany = this.dialog.open(ConfirmCommonComponent, {
      width: '300px',
      data: {title: '', content: '代理店「' + name + '」を削除してもよろしいでしょうか。', btnAcceptTitle: '削除'},
      panelClass: ['remodal-wrapper', 'remodal-is-opened', 'custom-modal', 'confirm-modal']
    });

    dialogCompany.afterClosed().subscribe(result => {
      if (result && result === 'OK') {
        const formData = {
          agent_no: id
        };
        this.httpService.post(this.API_URLS.deleteAgent, formData).subscribe(res => {
          if (res.code === this.RESULT_CODE.success) {
            this.getListAgent();
          } else {
            console.log(res);
          }
        });
      }
    });
  }

  goDetail(id: number): void {
    this.router.navigate(['/' + this.ROUTER_URL.agencyInfoEdit + '/' + id]);
  }

  doBack(): void {
    this.router.navigate([localStorage.getItem('agency-prev-page')]);
  }

  addNewAgency(): void {
    this.router.navigate(['/' + this.ROUTER_URL.agencyInfoEdit + '/' + 0]);
  }
}
