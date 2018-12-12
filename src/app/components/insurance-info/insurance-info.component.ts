import { GlobalsHome } from './../../core/service/global-variables';
import { HttpService } from './../../core/service/http.service';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { BaseCpnComponent } from '../../core/base-cpn/base-cpn.component';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';

declare var $: any;
@Component({
  selector: 'app-insurance-info',
  templateUrl: './insurance-info.component.html',
  styleUrls: ['./insurance-info.component.css']
})
export class InsuranceInfoComponent extends BaseCpnComponent implements OnInit, AfterViewInit {
  headerTitle = '死亡時に備える';
  paramCategory = 'all';
  detailKeiyaku: any;
  listInfoKeiyaku = [];
  listShukeiyaku = [];
  listTokuyaku = [];
  param: any;
  countImg: number;
  listHaraikata = [];
  numberImageRelation: number;
  alowEdit: boolean = true;

  constructor(public dialog: MatDialog,
    public translate: TranslateService,
    private route: ActivatedRoute,
    public httpService: HttpService,
    public router: Router,
    public globalsHome: GlobalsHome) {
    super(translate, 'insurance-info');
  }

  ngOnInit() {
    this.route.params.subscribe(paramsId => {
      this.param = Number(paramsId.id);
      this.callGetDetailKeiyaku(this.param);
      this.getListImageRelation();
    });
  }

  onResize(event: any) {
    this.checkWindow();
  }

  checkWindow() {
    setTimeout(function() {
      let checkRegions = $('.checkRegion');
      for (let j = 0; j < checkRegions.length; j++) {
        let checkRegion = checkRegions[j];
        let regionItem = $(checkRegion).find('.form-row');
        for (let i = 0; i < regionItem.length; i++) {
          let item = regionItem[i];
          let rowContent = $(item).find('.row-content');
          let rowTitle = $(rowContent).find('.row-title');
          let rowValue = $(rowContent).find('.row-value');
          if (($(rowTitle).width() + $(rowValue).width()) > $(rowContent).width()) {
            $(rowValue).css("float", "left");
          }
          else {
            $(rowValue).css("float", "right");
          }
        }
      }
    }, 500);
  }

  mapHaraikata(HoshoCategoryF) {
    switch (HoshoCategoryF) {
      case 1:
        this.headerTitle = '死亡時に備える';
        this.paramCategory = 'life';
        break;
      case 2:
        this.headerTitle = '病気やケガに備える';
        this.paramCategory = 'injure';
        break;
      case 3:
        this.headerTitle = '貯金を兼ねて備える';
        this.paramCategory = 'saving';
        break;
      case 4:
        this.headerTitle = '自動車の保険';
        this.paramCategory = 'car';
        break;
      case 5:
        this.headerTitle = '住まいの保険';
        this.paramCategory = 'house';
        break;
      case 6:
        this.headerTitle = 'レジャーの保険';
        this.paramCategory = 'leisure';
        break;
      case 7:
        this.headerTitle = '旅行の保険';
        this.paramCategory = 'travel';
        break;
      case 8:
        this.headerTitle = 'その他の保険';
        this.paramCategory = 'other';
        break;
    }
  }

  getListImageRelation() {
    this.httpService.post(this.API_URLS.getListFileRelation, { user_no: localStorage.getItem('user_no') }).subscribe(res => {
      if (res.code === this.RESULT_CODE.success) {
        this.numberImageRelation = res.data.length;
      } else {
        this.requestResult.err = true;
        this.requestResult.msg = res.message;
      }
    });
  }

  callGetDetailKeiyaku(keiyakuNo: number) {
    this.httpService.post(this.API_URLS.getDetailKeiyaku, { keiyaku_no: keiyakuNo }).subscribe(res => {
      if (res.code === this.RESULT_CODE.success) {
        this.detailKeiyaku = res.data;
        this.listInfoKeiyaku = this.detailKeiyaku.keiyaku;
        this.mapHaraikata(this.detailKeiyaku.keiyakuField.HoshoCategoryF);
        this.convertToMooney();
        this.listShukeiyaku = this.detailKeiyaku.shuKeiyaku;
        this.listTokuyaku = this.detailKeiyaku.tokuyakus;
        this.countImg = this.detailKeiyaku.keiyakuField.countImg;
        this.alowEdit = this.detailKeiyaku.keiyakuField.NyuryokuF !== 0;

        this.checkWindow();
      } else {
        this.requestResult.err = true;
        this.requestResult.msg = res.message;
      }
    });
  }

  mapValueToViewValueHosho(isShukeiyaku: boolean, index: number, indexTokuyaku?: number) {
    if (isShukeiyaku) {
      if(this.listShukeiyaku[index].TypeF === 10) {
        if (!isNaN(this.listShukeiyaku[index].ColumnVal) && this.listShukeiyaku[index].HoshoNo !== 0 && this.listShukeiyaku[index].HoshoNo !== '0') {
          return this.listShukeiyaku[index].ColumnVal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + this.detailKeiyaku.keiyakuField.ForeignFName;
        } else {
          return this.listShukeiyaku[index].ColumnVal;
        }
      }
      else if (
        this.listShukeiyaku[index].TypeF === 20 || 
        this.listShukeiyaku[index].TypeF === 40 || 
        this.listShukeiyaku[index].TypeF === 70 || 
        this.listShukeiyaku[index].TypeF === 50 ||
        this.listShukeiyaku[index].TypeF === 90 ||
        this.listShukeiyaku[index].TypeF === 60 ||
        this.listShukeiyaku[index].TypeF === 80
      ){
        return this.listShukeiyaku[index].ColumnValText;
      }
      else if (this.listShukeiyaku[index].TypeF === 35) {
        if (typeof this.listShukeiyaku[index].ColumnVal !== 'undefined' && this.listShukeiyaku[index].ColumnVal !== null) {
          let arrDate = this.listShukeiyaku[index].ColumnVal.split('-');
          return arrDate[0] + '年' + arrDate[1] + '月';
        }
        else {
          return '';
        }
      }
      else {
        return this.listShukeiyaku[index].ColumnVal;
      }
    } else if (!isShukeiyaku) {
      if (this.listTokuyaku[indexTokuyaku].tokuyakuHoshos[index].TypeF === 10) {
        if (!isNaN(this.listTokuyaku[indexTokuyaku].tokuyakuHoshos[index].ColumnVal) && this.listTokuyaku[indexTokuyaku].tokuyakuHoshos[index].HoshoNo !== 0 && this.listTokuyaku[indexTokuyaku].tokuyakuHoshos[index].HoshoNo !== '0') {
          return this.listTokuyaku[indexTokuyaku].tokuyakuHoshos[index].ColumnVal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + this.detailKeiyaku.keiyakuField.ForeignFName;
        } else {
          return this.listTokuyaku[indexTokuyaku].tokuyakuHoshos[index].ColumnVal;
        }
      }
      else if (
        this.listTokuyaku[indexTokuyaku].tokuyakuHoshos[index].TypeF === 20 || 
        this.listTokuyaku[indexTokuyaku].tokuyakuHoshos[index].TypeF === 40 || 
        this.listTokuyaku[indexTokuyaku].tokuyakuHoshos[index].TypeF === 70 || 
        this.listTokuyaku[indexTokuyaku].tokuyakuHoshos[index].TypeF === 50 ||
        this.listTokuyaku[indexTokuyaku].tokuyakuHoshos[index].TypeF === 90 ||
        this.listTokuyaku[indexTokuyaku].tokuyakuHoshos[index].TypeF === 60 ||
        this.listTokuyaku[indexTokuyaku].tokuyakuHoshos[index].TypeF === 80
      ){
        return this.listTokuyaku[indexTokuyaku].tokuyakuHoshos[index].ColumnValText;
      }
      else if (this.listTokuyaku[indexTokuyaku].tokuyakuHoshos[index].TypeF === 35) {
        if (typeof this.listTokuyaku[indexTokuyaku].tokuyakuHoshos[index].ColumnVal !== 'undefined' && this.listTokuyaku[indexTokuyaku].tokuyakuHoshos[index].ColumnVal !== null) {
          let arrDate = this.listTokuyaku[indexTokuyaku].tokuyakuHoshos[index].ColumnVal.split('-');
          return arrDate[0] + '年' + arrDate[1] + '月';
        }
        else {
          return '';
        }
      }
      else {
        return this.listTokuyaku[indexTokuyaku].tokuyakuHoshos[index].ColumnVal;
      }
    }
  }

  convertToMooney() {
    this.listInfoKeiyaku.forEach((data) => {
      if (data.column === 'HokenP' && data.value !== null) {
        data.value = data.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      }
    });
  }

  ngAfterViewInit() {
    $.getScript('assets/js/custom.js', function () { });
  }

  doBack(): void {
    if (this.globalsHome.paramCategory) {
      const category = this.globalsHome.paramCategory;
      this.globalsHome.paramCategory = null;
      if (category === 'all') {
        this.router.navigate(['/' + this.ROUTER_URL.insuranceContract + '/' + category]);
        return;
      }
    }

    let category = '';
    switch(this.detailKeiyaku.keiyakuField.HoshoCategoryF) {
      case 1:
      category = 'life';
      break;
      case 2:
      category = 'injure';
      break;
      case 3:
      category = 'saving';
      break;
      case 4:
      category = 'car';
      break;
      case 5:
      category = 'house';
      break;
      case 6:
      category = 'leisure';
      break;
    }
    this.router.navigate(['/' + this.ROUTER_URL.insuranceContract + '/' + category]);
  }

  doEdit(): void {
    localStorage.removeItem('mockDataKeiyaku');
    localStorage.setItem('page-goto-edit', this.router.url);
    this.router.navigate(['/' + this.ROUTER_URL.insuranceInfoEdit + '/' + this.param]);
  }

  goImage(): void {
    if (this.countImg > 0) {
      this.globalsHome.isHokenInfo = true;
      this.globalsHome.keiyaku_no = this.detailKeiyaku.keiyakuField.KeiyakuNo;
      localStorage.setItem('pre-page-shouken-list', this.router.url);
      this.router.navigate(['/' + this.ROUTER_URL.shoukenList + '/' + this.detailKeiyaku.keiyakuField.GroupID + '/falseInfo']);
    }
  }

  goImageRelation() {
    if (this.numberImageRelation > 0) {
      localStorage.setItem('pre-page-shouken-list', this.router.url);
      this.router.navigate(['/' + this.ROUTER_URL.shoukenList + '/' + this.detailKeiyaku.keiyakuField.GroupID + '/relation']);
    }
  }

  goInfo(index: number): void {
    if (this.listInfoKeiyaku[index].column === 'AgentName') {
      localStorage.setItem('pre-page-view-agent', this.router.url);
      this.router.navigate(['/' + this.ROUTER_URL.viewAgencyInfo + '/' + this.detailKeiyaku.keiyakuField.AgentNo]);
    }
    else if (this.listInfoKeiyaku[index].column === 'CompanyName') {
      this.router.navigate(['/' + this.ROUTER_URL.viewInsuranceInfo + '/' + this.param]);
    }
  }
}
