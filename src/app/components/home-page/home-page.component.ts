import { GlobalsHome } from './../../core/service/global-variables';
import { Router } from '@angular/router';
import { HttpService } from './../../core/service/http.service';
import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { BaseCpnComponent } from '../../core/base-cpn/base-cpn.component';
import { ObjListCategory } from '../../core/model/list-category';

declare var $: any;
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent extends BaseCpnComponent implements OnInit, AfterViewInit, OnDestroy {
  headerTitle = 'ホーム';
  name = '';
  relations: number[] = [];
  currentRelation = Number(localStorage.getItem('relation'));
  familyno =  localStorage.getItem('familyNo');
  person: any;
  objListCategory = new ObjListCategory;
  listFamily = [];
  loginId = '';
  mooneyPerMonth = 0;
  mooneyPerYear = 0;
  mpm: any;
  mpy: any;
  layout: string = 'grid';

  constructor(
    public translate: TranslateService,
    public httpService: HttpService,
    public router: Router,
    private globalsHome: GlobalsHome
  ) {
    super(translate, 'home');
  }

  ngOnInit() {
    if (typeof localStorage.getItem('layoutType') !== "undefined" && localStorage.getItem('layoutType') !== null) {
      this.layout = localStorage.getItem('layoutType');
    }
    this.getLoginId();
    this.callApiGetFamily();
  }

  ngOnDestroy() {
  }

  getLoginId(): void {
    this.loginId = localStorage.getItem('login_id');
  }

  listenChangeRelation(event): void {
    this.checkFamilyNoAndGetListKeiyaku(event);
  }

  checkFamilyNoAndGetListKeiyaku(result: any): void {
    if (typeof result !== 'undefined') {
      const familyNo = result.FamilyNo;
      this.name = result.LastName + ' ' + result.FirstName;
      this.callApiGetListKeiyaku(familyNo);
    }
  }

  ngAfterViewInit() {
    $.getScript('assets/js/custom.js', function() {});
  }

  callApiGetListKeiyaku(familyNo: number) {
    this.httpService.post(this.API_URLS.getListKeiyaku, {hiho_family_no: familyNo}).subscribe(res => {
      if (res.code === this.RESULT_CODE.success) {
        this.objListCategory = new ObjListCategory;
        this.mooneyPerMonth = 0;
        this.mooneyPerYear = 0;
        res.data.forEach(element => {
          this.objListCategory.all.push(element);
          switch (element.HoshoCategoryF) {
            case 1:
              this.objListCategory.life.push(element);
              break;
            case 2:
              this.objListCategory.injure.push(element);
              break;
            case 3:
              this.objListCategory.saving.push(element);
              break;
            case 4:
              this.objListCategory.car.push(element);
              break;
            case 5:
              this.objListCategory.house.push(element);
              break;
            case 6:
              this.objListCategory.leisure.push(element);
              break;
          }
          if ((
            element.HoshoCategoryF === 1 || 
            element.HoshoCategoryF === 2 || 
            element.HoshoCategoryF === 3 || 
            element.HoshoCategoryF === 4 || 
            element.HoshoCategoryF === 5 || 
            element.HoshoCategoryF === 6
          ) && element.HokenP && element.Haraikata && (element.Status === 1) && (element.CurrencyF === 0)) {
            switch (element.Haraikata) {
              case 1:
                this.mooneyPerMonth += Math.ceil(element.HokenP / 12);
                this.mooneyPerYear += Math.ceil(element.HokenP);
                break;
              case 2:
                this.mooneyPerMonth += Math.ceil(element.HokenP / 6);
                this.mooneyPerYear += Math.ceil(element.HokenP * 2);
                break;
              case 3:
                this.mooneyPerMonth += Math.ceil(element.HokenP);
                this.mooneyPerYear += Math.ceil(element.HokenP * 12);
                break;
              case 4:
              case 6:
              case 9:
                this.mooneyPerMonth += 0;
                this.mooneyPerYear += 0;
                break;
            }
          }
        });
        this.mpm = this.mooneyPerMonth.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        this.mpy = this.mooneyPerYear.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      } else {
        this.requestResult.err = true;
        this.requestResult.msg = res.message;
      }
    });
  }

  callApiGetFamily() {
    this.httpService.post(this.API_URLS.getFamily, {login_id: this.loginId}).subscribe(res => {
      if (res.code === this.RESULT_CODE.success) {
        this.listFamily = res.data;
        if (this.familyno !== 'null') {
          this.listFamily.forEach((element) => {
            if (this.familyno === element.FamilyNo) {
              this.person = element;
            }
          });
        } else {
          localStorage.setItem('relation', '0');
          this.listFamily.forEach((element) => {
            if ( element.Relation === 0) {
              this.person = element;
            }
          });
        }
        this.checkFamilyNoAndGetListKeiyaku(this.person);
      } else {
        this.requestResult.err = true;
        this.requestResult.msg = res.message;
      }
    });
  }

  goToContract(type: string, id: number): void {
    localStorage.setItem('categoryID', id.toString());
    localStorage.setItem('layoutType', this.layout);
    this.globalsHome.relations = this.relations;
    this.router.navigate(['/' + this.ROUTER_URL.insuranceContract + '/' + type]);
  }

  swicthLayout(layout: string): void {
    this.layout = layout;
  }
}
