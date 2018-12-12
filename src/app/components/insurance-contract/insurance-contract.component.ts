import { HttpService } from './../../core/service/http.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MatDialog } from '@angular/material';

import { BaseCpnComponent } from '../../core/base-cpn/base-cpn.component';
import { GlobalsHome } from '../../core/service/global-variables';
import { IHash } from '../../core/common/ultils';
import { environment } from '../../../environments/environment';
import { ConfirmCommonComponent } from '../popup/confirm-common/confirm-common.component';

declare var $: any;
@Component({
  selector: 'app-insurance-contract',
  templateUrl: './insurance-contract.component.html',
  styleUrls: ['./insurance-contract.component.css']
})
export class InsuranceContractComponent extends BaseCpnComponent implements OnInit, AfterViewInit {
  headerTitle = '';
  sub: any;
  relations: number[];
  currentRelation: number;
  objListCategoryDetail: any[];
  mooneyPerMonth: number;
  mooneyPerYear: number;
  mpm: any;
  mpy: any;
  name = '';
  listFamily = [];
  listFileIDAuto = [];
  urlAPI = environment.apiUrl;
  person: any;
  param: string;
  familyNo: string;
  categoryID: any;
  listStatus = [];
  listHaraikata = [];
  listMoney = [];
  StatusMap: IHash = {};
  HaraikataMap: IHash = {};
  token = localStorage.getItem('id_token');
  familyFilter = 0;

  constructor(
    public dialog: MatDialog,
    public translate: TranslateService,
    public router: Router,
    private route: ActivatedRoute,
    private globalsHome: GlobalsHome,
    public httpService: HttpService
  ) {
    super(translate, 'insurance-contract');
  }

  ngOnInit() {
    const searchStatusName = {
      sel_type: 12
    };
    this.httpService.post(this.API_URLS.getSelectItem, searchStatusName).subscribe(res => {
      if (res.code === this.RESULT_CODE.success) {
        for (let i = 0; i < res.data.length; i ++) {
          const item = res.data[i];
          this.StatusMap[item.selNo] = item.name;
        }
      } else {
        console.log(res);
      }
    });
    const searchHaraikata = {
      sel_type: 13
    };
    this.httpService.post(this.API_URLS.getSelectItem, searchHaraikata).subscribe(res => {
      if (res.code === this.RESULT_CODE.success) {
        for (let i = 0; i < res.data.length; i ++) {
          const item = res.data[i];
          this.HaraikataMap[item.selNo] = item.name;
        }
      } else {
        console.log(res);
      }
    });
    const searchMoney = {
      sel_type: 21
    };
    this.httpService.post(this.API_URLS.getSelectItem, searchMoney).subscribe(res => {
      if (res.code === this.RESULT_CODE.success) {
        this.listMoney = res.data;
      } else {
        console.log(res);
      }
    });

    this.globalsHome.isHokenInfo = false;
    this.globalsHome.paramCategory = null;
    this.filterCategory();
    this.currentRelation = Number(localStorage.getItem('relation'));
    this.familyNo = localStorage.getItem('familyNo');
    this.callApiGetFamily();
  }

  filterCategory(): void {
    this.param = this.route.snapshot.params['id'];
    switch (this.param) {
      case 'all':
        this.categoryID = null;
        this.headerTitle = 'すべて';
        break;
      case 'life':
        this.categoryID = 1;
        this.headerTitle = '死亡時に備える';
        break;
      case 'injure':
        this.categoryID = 2;
        this.headerTitle = '病気やケガに備える';
        break;
      case 'saving':
        this.categoryID = 3;
        this.headerTitle = '貯金を兼ねて備える';
        break;
      case 'car':
        this.categoryID = 4;
        this.headerTitle = '自動車の保険';
        break;
      case 'house':
        this.categoryID = 5;
        this.headerTitle = '住まいの保険';
        break;
      case 'leisure':
        this.categoryID = 6;
        this.headerTitle = '旅行・レジャー・その他の保険';
        break;
      case 'travel':
        this.categoryID = 7;
        this.headerTitle = '旅行の保険';
        break;
      case 'other':
        this.categoryID = 8;
        this.headerTitle = 'その他の保険';
        break;
    }
  }

  ngAfterViewInit() {
    $.getScript('assets/js/custom.js', function() {});
  }

  doAdd(): void {
    localStorage.setItem('pre-page-shouken-list', this.router.url);
    localStorage.removeItem("listFileNameTemp");
    this.router.navigate(['/' + this.ROUTER_URL.shoukenList + '/0' + '/true']);
  }

  goDetail(index: any): void {
    this.globalsHome.paramCategory = this.param;
    this.router.navigate(['/' + this.ROUTER_URL.insuranceInfo + '/' + this.objListCategoryDetail[index].KeiyakuNo]);
  }

  listenChangeRelation(event) {
    this.checkFamilyNoAndGetListKeiyaku(event, this.categoryID);
  }

  checkFamilyNoAndGetListKeiyaku(person, categoryID: number): void {
    const familyNo = person.FamilyNo;
    this.name = person.LastName + ' ' + person.FirstName;
    this.callApiGetListKeiyaku(familyNo, categoryID);
  }

  callApiGetListKeiyaku(familyNo: number, categoryID: number) {
    this.httpService.post(this.API_URLS.getListKeiyaku, {hiho_family_no: familyNo, hosho_category_f: categoryID}).subscribe(res => {
      if (res.code === this.RESULT_CODE.success) {
        this.objListCategoryDetail = res.data;
        this.mooneyPerMonth = 0;
        this.mooneyPerYear = 0;
        this.listFileIDAuto = [];
        for (let i = 0; i < this.objListCategoryDetail.length; i++) {
          const random = Math.floor((Math.random() * 100000) + 1);
          const item = this.objListCategoryDetail[i];
          this.listFileIDAuto.push({groupID: 0, fileID: 0, src: ''});
          if (item.NyuryokuF === 0) {
            this.httpService.post(this.API_URLS.getListFile, {group_id : item.GroupID}).subscribe(result => {
              if (result.code === this.RESULT_CODE.success) {
                const listImage = result.data;
                this.listFileIDAuto[i].groupID = item.GroupID;
                this.listFileIDAuto[i].fileID = listImage[0].FileID;
                const src = this.urlAPI + 'api/getFileImg?group_id=' + item.GroupID +
                '&file_id=' + listImage[0].FileID + '&token=' + this.token + '&' + random;
                this.listFileIDAuto[i].src = src;
              }
            });
          }
          item.StatusName = this.StatusMap[item.Status];
          item.HaraikataName = this.HaraikataMap[item.Haraikata];
          if ((
            item.HoshoCategoryF === 1 || 
            item.HoshoCategoryF === 2 || 
            item.HoshoCategoryF === 3 || 
            item.HoshoCategoryF === 4 || 
            item.HoshoCategoryF === 5 || 
            item.HoshoCategoryF === 6
          ) && item.HokenP && item.Haraikata && (item.Status === 1) && (item.CurrencyF === 0)) {
            item.Money = Math.ceil(item.HokenP).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            item.HaraikataName = this.HaraikataMap[item.Haraikata];
            switch (item.Haraikata) {
              case 1:
                this.mooneyPerMonth += Math.ceil(item.HokenP / 12);
                this.mooneyPerYear += Math.ceil(item.HokenP);
                break;
              case 2:
                this.mooneyPerMonth += Math.ceil(item.HokenP / 6);
                this.mooneyPerYear += Math.ceil(item.HokenP * 2);
                break;
              case 3:
                this.mooneyPerMonth += Math.ceil(item.HokenP);
                this.mooneyPerYear += Math.ceil(item.HokenP * 12);
                break;
              case 4:
              case 6:
              case 9:
                this.mooneyPerMonth += 0;
                this.mooneyPerYear += 0;
                break;
            }
          } else {
            item.Money = Math.ceil(item.HokenP).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
          }
        }
        this.mpm = this.mooneyPerMonth.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        this.mpy = this.mooneyPerYear.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      } else {
        this.requestResult.err = true;
        this.requestResult.msg = res.message;
      }
    });
  }

  goToImage(index: number) {
    localStorage.setItem('url-before-detail', this.router.url);
    this.router.navigate(['/' + this.ROUTER_URL.shoukenDetail + '/' + this.listFileIDAuto[index].groupID +
    '/' + this.listFileIDAuto[index].fileID + '/true']);
  }

  callApiGetFamily() {
    this.httpService.post(this.API_URLS.getFamily, {login_id: localStorage.getItem('login_id')}).subscribe(res => {
      if (res.code === this.RESULT_CODE.success) {
        this.listFamily = res.data;
        res.data.forEach(element => {
          if (this.familyNo !== 'null' && this.familyNo === element.FamilyNo) {
            this.person = element;
          }
          if (this.familyNo === 'null' && element.Relation === 0) {
            this.person = element;
          }
        });
        const familyNo = this.person.FamilyNo;
        this.name = this.person.LastName + ' ' + this.person.FirstName;
        this.familyFilter = familyNo;
        this.callApiGetListKeiyaku(familyNo, this.categoryID);
      } else {
        this.requestResult.err = true;
        this.requestResult.msg = res.message;
      }
    });
  }

  deleteKeiyaku(keiyakuId) {
    const dialogCompany = this.dialog.open(ConfirmCommonComponent, {
      width: '300px',
      data: { title: '', content: '「この契約を削除します。<br />よろしいですか？」', btnAcceptTitle: '破棄' },
      panelClass: ['remodal-wrapper', 'remodal-is-opened', 'custom-modal', 'confirm-modal']
    });

    dialogCompany.afterClosed().subscribe(result => {
      if (result === 'OK') {
        let keiyakuDelete = {
          keiyaku_no: keiyakuId
        }
        this.httpService.post(this.API_URLS.deleteKeiyaku, keiyakuDelete).subscribe(res => {
          if (res.code === this.RESULT_CODE.success) {
            this.callApiGetListKeiyaku(this.familyFilter, this.categoryID);
          }
          else {
            console.log(res);
          }
        });
      }
    });
  }

  getMoney(hoken) {
    for (let i = 0; i < this.listMoney.length; i++) {
      let money = this.listMoney[i];
      if (money.selNo === hoken.CurrencyF) {
        return money.name;
      }
    }
  }
}
