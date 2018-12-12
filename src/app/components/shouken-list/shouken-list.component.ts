import { async } from '@angular/core/testing';
import { KeiyakuView } from './../../core/model/keiyaku-view';
import { environment } from './../../../environments/environment';
import { GlobalsHome } from './../../core/service/global-variables';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';
import * as EXIF from 'exif-js';

import { ConfirmCommonComponent } from '../popup/confirm-common/confirm-common.component';
import { BaseCpnComponent } from '../../core/base-cpn/base-cpn.component';
import { AddStockConfirmComponent } from './add-stock-confirm/add-stock-confirm.component';
import { SelectImgComponent } from './select-img/select-img.component';
import { WebcamImage } from 'ngx-webcam';
import { Subject, Observable } from 'rxjs';
import { HttpService } from '../../core/service/http.service';
import { CommonService } from '../../core/service/common.service';

declare var $: any;
@Component({
  selector: 'app-shouken-list',
  templateUrl: './shouken-list.component.html',
  styleUrls: ['./shouken-list.component.css']
})
export class ShoukenListComponent extends BaseCpnComponent implements OnInit, AfterViewInit, OnDestroy {
  isiPhone = false;
  isiPad = false;
  isiDevice = false;
  hiddenPopup = true;
  formData = new FormData();
  ischeck = false;
  random: number;
  token = localStorage.getItem('id_token');
  urlAPI = environment.apiUrl;
  headerTitle = '保険証券画像';
  isShowCamera = false;
  param: number;
  public showWebcam = true;
  statusPage: any;
  enableDelete = true;
  isHideDialog: string;
  rotateIphone = [];
  newImage: any;
  user_no = localStorage.getItem('user_no');
  listFileNameTemp = [];
  // latest snapshot
  public webcamImage: WebcamImage = null;
  // webcam snapshot trigger
  trigger: Subject<void> = new Subject<void>();

  get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }
  constructor(
    public router: Router,
    public route: ActivatedRoute,
    public dialog: MatDialog,
    public translate: TranslateService,
    public httpService: HttpService,
    public globalsHome: GlobalsHome,
    public commonService: CommonService
  ) {
    super(translate, 'shouken-list');
  }

  images: any[] = [];

  ngOnInit() {
    this.route.params.subscribe(paramsId => {
      this.param = Number(paramsId.id);
      this.statusPage = paramsId.status;
      this.random = Math.floor((Math.random() * 100000) + 1);
      if (this.statusPage === 'relation') {
        this.headerTitle = ' 関連資料画像';
        this.getListImageRelation();
      } else {
        if (this.statusPage === 'falseInfo') {
          this.enableDelete = false;
        }
        this.images.forEach((image) => {
          if (image.AutoF === 0 && image.Status === 1) {
            this.enableDelete = false;
          }
        });
        if (this.param > 0) {
          this.callApiGetImage({ group_id: this.param });
        }
        this.isHideDialog = localStorage.getItem('checkboxStatus');
        this.listFileNameTemp = localStorage.getItem('listFileNameTemp') !== null ? JSON.parse(localStorage.getItem('listFileNameTemp')) : [];
        localStorage.removeItem('listFileNameTemp');
      }
    });
    this.isiPad = (navigator.userAgent.match(/iPad/i) != null);
    this.isiPhone = (navigator.userAgent.match(/iPhone/i) != null);

    if (this.isiPhone || this.isiPad) {
      this.isiDevice = true;
    }
  }

  ngOnDestroy() {
  }

  getListImageRelation() {
    this.httpService.post(this.API_URLS.getListFileRelation, { user_no: localStorage.getItem('user_no') }).subscribe(res => {
      if (res.code === this.RESULT_CODE.success) {
        this.images = res.data;
        this.enableDelete = false;
        this.images.forEach((image) => {
          image.UpdateDate = this.convertTime(image.UpdateDate);
        });
      } else {
        this.requestResult.err = true;
        this.requestResult.msg = res.message;
      }
    });
  }

  ngAfterViewInit() {
    $.getScript('assets/js/custom.js', function () { });
  }

  enableBtnAddImg(): boolean {
    return !(this.statusPage === 'falseInfo' || this.statusPage === 'relation');
  }

  enableBtnAutoAndHandler(): boolean {
    return this.statusPage === 'true';
  }

  callApiGetImage(groupID: object) {
    this.httpService.post(this.API_URLS.getListFile, groupID).subscribe(res => {
      if (res.code === this.RESULT_CODE.success) {
        this.images = res.data;
        for (let i = 0; i < this.images.length; i++) {
          const image = this.images[i];
          image.UpdateDate = this.convertTime(image.UpdateDate);
          if (image.AutoF === 0 && image.Status === 1) {
            this.enableDelete = false;
            image.UpdateDate = '自動入力中';
          }
        }
      } else {
        this.requestResult.err = true;
        this.requestResult.msg = res.message;
      }
    });
  }

  convertTime(time: string): string {
    return moment(time, 'YYYY-MM-DDTHH:mm:ss').format('YYYY/MM/DD HH:mm');
  }

  doAdd(): void {
    if (this.isiDevice) {
      this.hiddenPopup = !this.hiddenPopup;
    } else {
      if (localStorage.getItem('checkboxStatus') !== 'true') {
        const dialogRef = this.dialog.open(AddStockConfirmComponent, {
          width: '400px',
          data: {}
        });
        dialogRef.afterClosed().subscribe(result => {
          if (result && result === 'OK') {
            this.openPopup();
          }
        });
      } else {
        this.openPopup();
      }
    }
  }

  openPopup() {
    const dialogSelectImg = this.dialog.open(SelectImgComponent, {
      width: '350px',
      data: { groupId: this.param, statusPage: this.statusPage },
      panelClass: 'select-img-popup'
    });
    dialogSelectImg.afterClosed().subscribe(resultSelectImg => {
      if (resultSelectImg && resultSelectImg.key === 'chooseFile') {
        if (this.param <= 0) {
          if (resultSelectImg.fileName === "reload") {
            this.router.navigate(['/' + this.ROUTER_URL.shoukenList + '/' + resultSelectImg.data + '/' + this.statusPage]);
          }
          else {
            let tempId = Math.random().toString(36).substring(7);
            let imageTemp = {
              id: tempId,
              fileName: resultSelectImg.fileName
            }
            this.listFileNameTemp.push(imageTemp);
            this.router.navigate(['/' + this.ROUTER_URL.shoukenList + '/' + this.param + '/' + this.statusPage]);
          }
          return;
        }
        this.callApiGetImage({ group_id: this.param });
      }
    });
  }

  doAuto(): void {
    const dialogRef = this.dialog.open(ConfirmCommonComponent, {
      width: '400px',
      data: {
        title: '自動入力が終了するまで少々お時間を頂きます。よろしいですか？',
        content: '予定完了日は<br />１〜２ 営業日後です。',
        btnAcceptTitle: '自動入力依頼'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result === 'OK') {
        const keiyakuFormData = {
          create: 'auto',
          group_id: 0,
          hosho_category_f: localStorage.getItem('categoryID'),
          product_name: '自動入力中',
          family_no: localStorage.getItem('familyNo'),
          family_name: localStorage.getItem('personName'),
          hiho_family_no: localStorage.getItem('familyNo'),
          hiho_family_name: localStorage.getItem('personName'),
          agent_no: 0,
          status: 0,
          file_uploads: this.listFileNameTemp
        };
        this.httpService.post(this.API_URLS.createKeiyaku, keiyakuFormData).subscribe(res => {
          if (res.code === this.RESULT_CODE.success) {
            localStorage.removeItem("listFileNameTemp");
            this.updateGroup(res.data.GroupId);
          } else {
            this.requestResult.err = true;
            this.requestResult.msg = res.message;
          }
        });
      }
    });
  }

  updateGroup(groupId): void {
    const formData = {
      group_id: groupId,
      auto_f: 0,
      status: 1
    };
    this.httpService.post(this.API_URLS.updateAuto, formData).subscribe(res => {
      if (res.code === this.RESULT_CODE.success) {
        this.router.navigate(['/' + this.ROUTER_URL.home]);
      } else {
        this.requestResult.err = true;
        this.requestResult.msg = res.message;
      }
    });
  }

  doHandle(): void {
    this.globalsHome.group_id = this.param;
    localStorage.setItem('listFileNameTemp', JSON.stringify(this.listFileNameTemp));
    if (localStorage.getItem('categoryID') === '0') {
      this.router.navigate(['/' + this.ROUTER_URL.insuranceType]);
    } else {
      localStorage.setItem('page-goto-edit', this.router.url);
      localStorage.removeItem('mockDataKeiyaku');
      this.router.navigate(['/' + this.ROUTER_URL.insuranceInfoEdit + '/0']);
    }
  }

  goDetail(group_id: any, file_id: any): void {
    localStorage.setItem('listFileNameTemp', JSON.stringify(this.listFileNameTemp));
    localStorage.setItem('url-before-detail', this.router.url);
    if (this.statusPage === 'relation') {
      const file_name = file_id;
      this.router.navigate(['/' + this.ROUTER_URL.shoukenDetail + '/' + this.user_no + '/' + file_name + '/false']);
    } else {
      this.router.navigate(['/' + this.ROUTER_URL.shoukenDetail + '/' + group_id + '/' + file_id + '/true']);
    }
  }

  deleteFile(groupId: any, fileId: any, index: number): void {
    if (this.images[index].AutoF === 0 && this.images[index].Status === 1) {
      return;
    }
    const imageID = {
      group_id: Number(groupId),
      file_id: Number(fileId)
    };
    this.httpService.post(this.API_URLS.deleteFile, imageID).subscribe(res => {
      if (res.code === this.RESULT_CODE.success) {
        this.images = this.images.filter(function (image) {
          return image.FileID !== fileId;
        });
      } else {
        this.requestResult.err = true;
        this.requestResult.msg = res.message;
      }
    });
  }

  doBack() {
    if (this.globalsHome.keiyaku_no) {
      if (this.statusPage === 'false') {
        this.router.navigate(['/' + this.ROUTER_URL.insuranceInfoEdit + '/' + this.globalsHome.keiyaku_no]);
      } else if (this.statusPage === 'relation') {
        this.globalsHome.group_id = this.param;
        this.router.navigate([localStorage.getItem('pre-page-shouken-list')]);
      } else {
        this.router.navigate(['/' + this.ROUTER_URL.insuranceInfo + '/' + this.globalsHome.keiyaku_no]);
      }
    }
    if (!this.globalsHome.keiyaku_no) {
      if (this.statusPage !== 'relation') {
        this.globalsHome.group_id = this.param;
        localStorage.setItem('listFileNameTemp', JSON.stringify(this.listFileNameTemp));
        this.router.navigate(['/' + this.ROUTER_URL.insuranceInfoEdit + '/0']);
      }
      if (this.statusPage === 'relation') {
        this.globalsHome.group_id = this.param;
        this.router.navigate([localStorage.getItem('pre-page-shouken-list')]);
      }
    }
  }

  deleteFileTemp(index: number) {
    this.listFileNameTemp.splice(index, 1);
    localStorage.setItem('listFileNameTemp', JSON.stringify(this.listFileNameTemp));
  }

  openChooseFile() {
    this.hiddenPopup = true;
    this.isHideDialog = this.ischeck.toString();
    localStorage.setItem('checkboxStatus', this.ischeck.toString());

    if (this.ischeck) {
      let objUpdate = {
        hoken_shoken_f: 1
      }
      this.httpService.post(this.API_URLS.hideDialog, objUpdate).subscribe(res => {
        if (res.code === this.RESULT_CODE.success) {
          
        } else {
          console.log(res);
        }
      });
    }
  }

  uploadIdevice(): void {
    const file = (<HTMLInputElement>document.getElementById('image_idevice')).files[0];
    if (file.name.match(/\.(jpg|jpeg|png|gif)$/)) {
      this.callApiUpload(file);
    }
  }

  async callApiUpload(file: any) {
    this.formData = new FormData();
    if ((this.param === 0) && this.statusPage === 'false' && this.globalsHome.keiyaku_no > 0) {
      this.formData.append('keiyaku_no', this.globalsHome.keiyaku_no.toString());
      this.formData.append('hiho_family_no', this.globalsHome.hiho_family_no.toString());
    }
    else {
      this.formData.append('hiho_family_no', this.globalsHome.family_no.toString());
    }

    if (this.param !== 0) {
      this.formData.append('group_id', this.param.toString());
    }
    this.formData.append('family_no', this.globalsHome.family_no.toString());
    
    this.formData.append('file_img', file);
    let resultSelectImg = await this.commonService.keiyakuUploadFile(this.formData);
    if (this.param <= 0) {
      if ((this.param === 0) && this.statusPage === 'false' && this.globalsHome.keiyaku_no > 0) {
        let mockDataKeiyaku = JSON.parse(localStorage.getItem('mockDataKeiyaku'));
        if (typeof mockDataKeiyaku !== "undefined" && mockDataKeiyaku !== null) {
          mockDataKeiyaku.group_id = resultSelectImg.data;
          localStorage.setItem('mockDataKeiyaku', JSON.stringify(mockDataKeiyaku));
        }
        this.router.navigate(['/' + this.ROUTER_URL.shoukenList + '/' + resultSelectImg.data + '/' + this.statusPage]);
      }
      else {
        let tempId = Math.random().toString(36).substring(7);
        let imageTemp = {
          id: tempId,
          fileName: resultSelectImg.fileName
        }
        this.listFileNameTemp.push(imageTemp);
        this.router.navigate(['/' + this.ROUTER_URL.shoukenList + '/' + this.param + '/' + this.statusPage]);
      }
      return;
    } else {
      this.callApiGetImage({ group_id: this.param });
    }
  }

  handleCheckbox(event) {
    this.ischeck = !this.ischeck;
  }
}