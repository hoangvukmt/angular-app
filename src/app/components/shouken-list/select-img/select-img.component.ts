import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { HttpService } from '../../../core/service/http.service';
import { API_URLS, ROUTER_URL, RESULT_CODE } from '../../../core/const';
import { CommonService } from '../../../core/service/common.service';
import { GlobalsHome } from '../../../core/service/global-variables';

declare var $: any;
@Component({
  selector: 'app-select-img',
  templateUrl: './select-img.component.html',
  styleUrls: ['./select-img.component.css']
})
export class SelectImgComponent implements OnInit {
  isWindow = true;
  hasCamera = true;
  formData = new FormData();
  protected API_URLS = API_URLS;
  public ROUTER_URL = ROUTER_URL;
  protected RESULT_CODE = RESULT_CODE;
  public requestResult = {
    err: false,
    msg: ''
  };
  group: number;
  constructor(
    public dialogRef: MatDialogRef<SelectImgComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    public httpService: HttpService,
    public route: ActivatedRoute,
    public globalsHome: GlobalsHome,
    public commonService: CommonService
  ) {
  }

  ngOnInit() {
    if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      this.isWindow = true;
      this.hasCamera = localStorage.getItem('hasCamera') === 'true';
    } else {
      this.isWindow = false;
    }
  }

  async callApiUploadImage(file: any) {
    if (file.name.match(/\.(jpg|jpeg|png|gif)$/)) {
      let groupId = null;
      if (this.data.groupId !== 0) {
        groupId = this.data.groupId;
      }
      if (this.data.groupId === 0 && this.data.statusPage === 'false' && this.globalsHome.keiyaku_no > 0 ) {
        this.formData.append('keiyaku_no', this.globalsHome.keiyaku_no.toString());
        this.formData.append('hiho_family_no', this.globalsHome.hiho_family_no.toString());
      }
      else {
        this.formData.append('hiho_family_no', this.globalsHome.family_no.toString());
      }
      if (this.data.groupId !== 0) {
        this.formData.append('group_id', groupId);
      }
      this.formData.append('family_no', this.globalsHome.family_no.toString());
      this.formData.append('file_img', file);

      let result = await this.commonService.keiyakuUploadFile(this.formData);
      if (this.data.groupId === 0 && this.data.statusPage === 'false' && this.globalsHome.keiyaku_no > 0 ) {
        let mockDataKeiyaku = JSON.parse(localStorage.getItem('mockDataKeiyaku'));
        if (typeof mockDataKeiyaku !== "undefined" && mockDataKeiyaku !== null) {
          mockDataKeiyaku.group_id = result.data;
          localStorage.setItem('mockDataKeiyaku', JSON.stringify(mockDataKeiyaku));
        }
        this.dialogRef.close({key: 'chooseFile', data: result.data, fileName: "reload"});
      }
      else {
        this.dialogRef.close({key: 'chooseFile', data: this.data.groupId, fileName: result.fileName});
      }
    }
  }

  upload(fileInput): void {
    const file = (<HTMLInputElement>document.getElementById(fileInput)).files[0];
    this.callApiUploadImage(file);
  }

  closePopup() {
    this.dialogRef.close('close');
  }
}
