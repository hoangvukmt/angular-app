import { GlobalsHome } from './../../core/service/global-variables';
import { Component, OnInit, Input, AfterViewInit, OnChanges, ViewChild } from '@angular/core';
import { MatDialog, MatDrawer } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

import { HttpService } from '../../core/service/http.service';
import { AnalyzerConfirmComponent } from '../popup/analyzer-confirm/analyzer-confirm.component';
import { API_URLS, ROUTER_URL, RESULT_CODE } from '../../core/const';

declare var $: any;
@Component({
  selector: 'app-header-cpn',
  templateUrl: './header-cpn.component.html',
  styleUrls: ['./header-cpn.component.css']
})
export class HeaderCpnComponent implements OnInit, AfterViewInit {
  public ROUTER_URL = ROUTER_URL;
  protected API_URLS = API_URLS;
  protected RESULT_CODE = RESULT_CODE;
  listFamily = [];
  hiddenButton1 = false;
  showButton2 = false;
  isHomePage = false;
  isAnalyzerPage = false;
  isMessage = false;
  personName = '';
  sex = '';
  countMessage = 0;
  @Input() headerTitle = 'ホーム';
  @Input() name = '';
  @Input() currentRelation;
  @ViewChild('drawer') public drawer: MatDrawer;

  constructor(
    private router: Router,
    public dialog: MatDialog,
    public httpService: HttpService,
    public translate: TranslateService,
    public globalsHome: GlobalsHome
  ) {

  }

  ngOnInit() {
    this.checkUrl();
    this.sex = localStorage.getItem('sex');
    if (this.name === '' || !this.name) {
      if (localStorage.getItem('personName') !== '') {
        this.name = localStorage.getItem('personName');
      } else {
        this.callApiGetFamily();
      }
    }
    if (!this.currentRelation) {
      this.currentRelation = Number(localStorage.getItem('relation'));
    }
    this.getMessage();

    window['headerComponent'] = {
      componentFn: () => this.getMessage(), 
      component: this
    };
  }

  goToHome() {
    this.router.navigate(['/' + this.ROUTER_URL.home]);
  }

  callApiGetFamily() {
    this.httpService.post(this.API_URLS.getFamily, {login_id: localStorage.getItem('login_id')}).subscribe(res => {
      if (res.code === this.RESULT_CODE.success) {
         res.data.forEach(element => {
           if (element.Relation === 0) {
            this.name = element.LastName + ' ' + element.FirstName;
            localStorage.setItem('personName', element.LastName + ' ' + element.FirstName);
            localStorage.setItem('relation', '0');
            localStorage.setItem('sex', element.Sex);
            this.sex = element.Sex;
           }
         });
      }
    });
  }

  ngAfterViewInit() {
  }

  checkRelation() {
    if (typeof localStorage.getItem('relation') !== 'undefined' && localStorage.getItem('relation') !== null
      && localStorage.getItem('relation') !== 'null' && localStorage.getItem('relation') !== 'undefined') {
      this.currentRelation = Number(localStorage.getItem('relation'));
    }
    this.getButtonStatus();
  }

  checkUrl() {
    const url = window.location.href;
    if (url.includes('home')) {
      this.isHomePage = true;
    } else if (url.includes('analyzer')) {
      this.isAnalyzerPage = true;
    } else if (url.includes('message-list')) {
      this.isMessage = true;
    }
  }

  doAnalyze(): void {
    $('.btn-toggle-menu').click();
    const dialogComfirm = this.dialog.open(AnalyzerConfirmComponent, {
      width: '400px',
      data: { },
      panelClass: ['remodal-wrapper', 'remodal-is-opened', 'custom-modal']
    });

    dialogComfirm.afterClosed().subscribe(result => {
      if (result && result === 'OK') {
        const formData = {
          user_no: localStorage.getItem('user_no'),
          message_type: 2,
          message_title: '「お試し証券分析」 依頼！'
        };
        this.httpService.post(this.API_URLS.createMessage, formData).subscribe(res => {
          if (res.code === this.RESULT_CODE.success) {
            this.hiddenButton1 = true;
            this.showButton2 = true;
            this.getMessage();
          } else {
            console.log(res);
          }
        });
      }
    });
  }

  doOrder(): void {
    window.location.href = 'https://www.hoken-clinic.com/list/';
  }

  goUrl(url: string, closeMenu: boolean): void {
    switch (url) {
      case 'family':
        setTimeout(() => {
          this.router.navigate(['/' + this.ROUTER_URL.familyList]);
          localStorage.setItem('family-prev-page', this.router.url);
        }, 500);
        break;
      case 'agency':
        setTimeout(() => {
          this.router.navigate(['/' + this.ROUTER_URL.agencyList]);
          localStorage.setItem('agency-prev-page', this.router.url);
        }, 500);
        break;
      case 'message':
        setTimeout(() => {
          this.router.navigate(['/' + this.ROUTER_URL.messageSend]);
          localStorage.setItem('message-prev-page', this.router.url);
        }, 500);
        break;
      case 'message-list':
        this.router.navigate(['/' + this.ROUTER_URL.messageList]);
        break;
      case 'logout':
        localStorage.clear();
        this.router.navigate(['/' + this.ROUTER_URL.login]);
        break;
      case 'personal':
        this.router.navigate(['/' + this.ROUTER_URL.personalInfoSetting]);
        localStorage.setItem('personal-prev-page', this.router.url);
        break;
      case 'change-pass':
        this.globalsHome.currentUrl = this.router.url;
        this.router.navigate(['/' + this.ROUTER_URL.changePass]);
        break;
      case 'setting':
        this.router.navigate(['/' + this.ROUTER_URL.setting]);
        break;
      case 'home':
        this.router.navigate(['/' + this.ROUTER_URL.home]);
        break;
      case 'analyzer':
        this.router.navigate(['/' + this.ROUTER_URL.analyzer]);
        break;
    }
    if (closeMenu) {
      this.drawer.toggle();
    }
  }

  getButtonStatus(): void {
    const searchKeiyaku = {
      hiho_family_no: localStorage.getItem('user_family_no'),
      hosho_category_f: 1
    };
    this.httpService.post(this.API_URLS.getListKeiyaku, searchKeiyaku).subscribe(res => {
      if (res.code === this.RESULT_CODE.success) {
        if (res.data.length === 0) {
          searchKeiyaku.hosho_category_f = 2;
          this.httpService.post(this.API_URLS.getListKeiyaku, searchKeiyaku).subscribe(res2 => {
            if (res2.code === this.RESULT_CODE.success) {
              if (res2.data.length === 0) {
                searchKeiyaku.hosho_category_f = 3;
                this.httpService.post(this.API_URLS.getListKeiyaku, searchKeiyaku).subscribe(res3 => {
                  if (res3.code === this.RESULT_CODE.success) {
                    if (res3.data.length === 0) {
                      this.hiddenButton1 = true;
                      this.showButton2 = false;
                    } else {
                      this.checkUserStatus();
                    }
                  } else {
                    console.log(res3);
                  }
                });
              } else {
                this.checkUserStatus();
              }
            } else {
              console.log(res2);
            }
          });
        } else {
          this.checkUserStatus();
        }
      } else {
        console.log(res);
      }
    });
  }

  checkUserStatus(): void {
    const searchFamily = {
      family_no: localStorage.getItem('user_family_no')
    }
    this.httpService.post(this.API_URLS.getInfoFamily, searchFamily).subscribe(res => {
      if (res.code === this.RESULT_CODE.success) {
        if (res.data.ShokenBunsekiF === null || res.data.ShokenBunsekiF === "" || res.data.ShokenBunsekiF === 0) {
          this.hiddenButton1 = false;
          this.showButton2 = false;
        }
        else {
          this.hiddenButton1 = true;
          this.showButton2 = true;
        }
      } else {
        console.log(res);
      }
    });
  }

  getMessage(): void {
    const searchMessage = {
      user_no: localStorage.getItem('user_no'),
      displayed: 0
    };
    this.httpService.post(this.API_URLS.getListMessage, searchMessage).subscribe(res => {
      if (res.code === this.RESULT_CODE.success) {
        this.countMessage = res.data.length;
      } else {
        console.log(res);
      }
    });
  }
}
