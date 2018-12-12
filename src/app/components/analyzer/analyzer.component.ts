import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';

import { HttpService } from '../../core/service/http.service';
import { CommonService } from '../../core/service/common.service';
import { ConfirmCommonComponent } from '../popup/confirm-common/confirm-common.component';
import { AnalyzerConfirmComponent } from '../popup/analyzer-confirm/analyzer-confirm.component';
import { BaseCpnComponent } from '../../core/base-cpn/base-cpn.component';
import { BannerComponent } from '../banner/banner.component';

declare var $: any;
@Component({
  selector: 'app-analyzer',
  templateUrl: './analyzer.component.html',
  styleUrls: ['./analyzer.component.css']
})
export class AnalyzerComponent extends BaseCpnComponent implements OnInit, AfterViewInit {
  headerTitle = '簡易診断';
  showDetail = false;
  hiddenButton1 = false;
  showButton2 = false;
  showAlert = false;
  dataResult = [];
  htmlMessage = "";
  @ViewChild(BannerComponent) banner: BannerComponent;

  constructor(
    public dialog: MatDialog,
    public httpService: HttpService,
    public commonService: CommonService,
    public translate: TranslateService
  ) {
    super(translate, 'analyzer');
  }

  ngOnInit() {
    
  }

  ngAfterViewInit() {
    $.getScript('assets/js/custom.js', function() {});
    this.getKaniShindanInfo();
    this.getButtonStatus();

    this.loadBanner();
  }

  getKaniShindanInfo(): void {
    var formData = {
      user_no: localStorage.getItem('user_no')
    }
    this.httpService.post(this.API_URLS.getKaniShindanInfo, formData).subscribe(res => {
      if (res.code === this.RESULT_CODE.success) {
        this.dataResult = res.data;
        for (var i = 0; i < this.dataResult.length; i++) {
          let item = this.dataResult[i];
          if (item.FamilyNo === localStorage.getItem('user_family_no')){
            this.htmlMessage = item.Message;
          }
        }
        this.openPopup();
        if (this.dataResult.length === 0) {
          $("td.td-category").css("width", "30%");
        }
        else {
          let displayW = window.innerWidth > 1000 ? 1000 : window.innerWidth;
          let categoryWidth = displayW * 0.3;
          let categoryItemWidth = displayW * 0.4;
          let maxWidth = categoryWidth + categoryItemWidth + this.dataResult.length * 80;
          /*if (window.innerWidth > maxWidth) {
            maxWidth = window.innerWidth;
          }*/
          
          let categoryPercent = (categoryWidth / maxWidth) * 100;
          let categoryItemPercent = (categoryItemWidth / maxWidth) * 100;
          $("#analyzerTbl").css("width", maxWidth + "px");
          $("td.td-category").css("width", categoryPercent + "%");
          $("td.td-category-item").css("width", categoryItemPercent + "%");
        }
      } else {
        console.log(res);
      }
    });
  }

  openPopup(): void {
    var dialogTitle = "";
    var btnAcceptTitle = "";
    let searchFamily = {family_no: localStorage.getItem('user_family_no')};
    this.httpService.post(this.API_URLS.getInfoFamily, searchFamily).subscribe(res => {
      if (res.code === this.RESULT_CODE.success) {
        let data = res.data;
        if (data.KaniShindanF === 0) {
          // Check condition show popup 1
          this.httpService.post(this.API_URLS.getKeiyakuByUser, {user_no: localStorage.getItem('user_no'), kani_shindan_f: 0}).subscribe(res => {
            if (res.code === this.RESULT_CODE.success) {
              if (res.data.length > 0) {
                // Show popup 1
                dialogTitle = "簡易診断が終了するまで少々お時間を頂きます。よろしいですか？";
                btnAcceptTitle = "診断する";
                this.showDialog (dialogTitle, btnAcceptTitle);
              }
            } else {
              console.log(res);
            }
          });
        }
        else {
          if (data.KaniShindanF === 2) {
            // Show alert
            this.showAlert = true;
          }
          else {
            this.showAlert = false;
          }
          // Check condition show popup 2
          this.httpService.post(this.API_URLS.getKeiyakuByUser, {user_no: localStorage.getItem('user_no'), kani_shindan_f: 0}).subscribe(res => {
            if (res.code === this.RESULT_CODE.success) {
              if (res.data.length > 0) {
                // Show popup 2
                dialogTitle = "保障内容が変更されています。再診断を行いますか？";
                btnAcceptTitle = "再診断";
                this.showDialog (dialogTitle, btnAcceptTitle);
              }
            } else {
              console.log(res);
            }
          });
        }
      }
      else {
        console.log(res);
      }
    });
  }

  doOrder() {
    window.open('https://www.hoken-clinic.com/list/');
    //window.location.href = 'https://www.hoken-clinic.com/list/';
  }

  showDialog(dialogTitle, btnAcceptTitle): void {
    let dialogComfirm = this.dialog.open(ConfirmCommonComponent, {
      width: '400px',
      data: {
        title: dialogTitle,
        content: '予定完了日は<br />１〜２ 営業日後です。',
        btnAcceptTitle: btnAcceptTitle
      }
    });

    dialogComfirm.afterClosed().subscribe(result => {
      if (result && result === 'OK') {
        var formData = {
          user_no: localStorage.getItem('user_no'),
          family_no: localStorage.getItem('familyNo'),
          family_name: localStorage.getItem('personName'),
          message_type: 1,
          message_title: "「簡易診断」 依頼！"
        }
        this.httpService.post(this.API_URLS.createMessage, formData).subscribe(res => {
          if (res.code === this.RESULT_CODE.success) {
            this.showAlert = true;
            this.getKaniShindanInfo();
            this.getButtonStatus();
            window['headerComponent'].componentFn();
          } else {
            console.log(res);
          }
        }); 
      }
    });
  }

  tabClick(showDetail: boolean): void {
    this.showDetail = showDetail;
    this.loadBanner();
  }

  loadBanner(): void {
    if (!this.showDetail) {
      let objSearch = {
        disp_id: "rdr01",
        agent_cd: localStorage.getItem('user_agent_cd')
      }
      this.httpService.post(this.API_URLS.getListBanner, objSearch).subscribe(res => {
        if (res.code === this.RESULT_CODE.success) {
          this.banner.listImage = res.data;
        }
        else {
          console.log(res);
        }
      });
    }
    else {
      let objSearch = {
        disp_id: "rdr02",
        agent_cd: localStorage.getItem('user_agent_cd')
      }
      this.httpService.post(this.API_URLS.getListBanner, objSearch).subscribe(res => {
        if (res.code === this.RESULT_CODE.success) {
          this.banner.listImage = res.data;
        }
        else {
          console.log(res);
        }
      });
    }
  }

  doAnalyze(): void {
    const dialogComfirm = this.dialog.open(AnalyzerConfirmComponent, {
      width: '400px',
      data: { },
      panelClass: ['remodal-wrapper', 'remodal-is-opened', 'custom-modal']
    });

    dialogComfirm.afterClosed().subscribe(result => {
      if (result && result === 'OK') {
        var formData = {
          user_no: localStorage.getItem('user_no'),
          message_type: 2,
          message_title: "「お試し証券分析」 依頼！"
        }
        this.httpService.post(this.API_URLS.createMessage, formData).subscribe(res => {
          if (res.code === this.RESULT_CODE.success) {
            this.hiddenButton1 = true;
            this.showButton2 = true;
            window['headerComponent'].componentFn();
          } else {
            console.log(res);
          }
        });
      }
    });
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
}
