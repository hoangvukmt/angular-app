import { Component, OnInit, AfterViewInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';

import { HttpService } from '../../core/service/http.service';
import { BaseCpnComponent } from '../../core/base-cpn/base-cpn.component';
import { ConfirmCommonComponent } from '../popup/confirm-common/confirm-common.component';

declare var $: any;
@Component({
  selector: 'app-family-list',
  templateUrl: './family-list.component.html',
  styleUrls: ['./family-list.component.css']
})
export class FamilyListComponent extends BaseCpnComponent implements OnInit, AfterViewInit {
  headerTitle = '家族設定';
  lstFamily = [];
  personalInfo = {
    RelationName: null,
    BirthdayShow: null,
    FamilyNo: null,
    LastName: null,
    FirstName: null,
    Relation: null
  };
  constructor(
    public dialog: MatDialog,
    private router: Router,
    public httpService: HttpService,
    public translate: TranslateService
  ) {
    super(translate, 'family-info');
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    $.getScript('assets/js/custom.js', function() {});
    this.getListFamily();
  }

  getListFamily(): void {
    const formData = {
      user_no: localStorage.getItem('user_no')
    };
    this.httpService.post(this.API_URLS.getListFamily, formData).subscribe(res => {
      this.lstFamily = [];
      if (res.code === this.RESULT_CODE.success) {
        for (let i = 0; i < res.data.length; i++) {
          const item = res.data[i];
          item.BirthdayShow = new Date(item.Birthday);
          if (item.Relation === 0) {
            this.personalInfo = item;
          } else {
            this.lstFamily.push(item);
          }
        }
      } else {
        console.log(res);
      }
    });
  }

  doBack(): void {
    if (localStorage.getItem('family-prev-page')) {
      this.router.navigate([localStorage.getItem('family-prev-page')]);
    } else {
      this.router.navigate(['/' + this.ROUTER_URL.home]);
    }
  }

  goPersonalInfo(): void {
    localStorage.setItem('personal-prev-page', this.router.url);
    this.router.navigate(['/' + this.ROUTER_URL.personalInfoSetting]);
  }

  addNewFamily(): void {
    this.router.navigate(['/' + this.ROUTER_URL.familyInfoSetting + '/' + 0]);
  }

  goDetail(id: number): void {
    this.router.navigate(['/' + this.ROUTER_URL.familyInfoSetting + '/' + id]);
  }

  deleteFamily(family): void {
    if (localStorage.getItem('familyNo') === family.FamilyNo.toString()) {
      localStorage.setItem('familyNo', this.personalInfo.FamilyNo);
      localStorage.setItem('personName', this.personalInfo.LastName + ' ' + this.personalInfo.FirstName)
      localStorage.setItem('relation', this.personalInfo.Relation);
    }
    const dialogCompany = this.dialog.open(ConfirmCommonComponent, {
      width: '300px',
      data: {title: '', content: 'この項目を削除してもよろしいでしょうか。', btnAcceptTitle: '削除'},
      panelClass: ['remodal-wrapper', 'remodal-is-opened', 'custom-modal']
    });

    dialogCompany.afterClosed().subscribe(result => {
      if (result && result === 'OK') {
        const formData = {
          family_no: family.FamilyNo
        };
        this.httpService.post(this.API_URLS.deleteFamily, formData).subscribe(res => {
          if (res.code === this.RESULT_CODE.success) {
            this.getListFamily();
          } else {
            console.log(res);
          }
        });
      }
    });
  }
}
