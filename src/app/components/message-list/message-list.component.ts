import { Component, OnInit, AfterViewInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

import { environment } from './../../../environments/environment';
import { HttpService } from '../../core/service/http.service';
import { BaseCpnComponent } from '../../core/base-cpn/base-cpn.component';

declare var $: any;
@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent extends BaseCpnComponent implements OnInit, AfterViewInit {
  public urlAPI = environment.apiUrl;
  public token = localStorage.getItem('id_token');
  public random: number = Math.floor((Math.random() * 100000) + 1);
  headerTitle = 'お知らせ';
  lstMessage = [];
  hiddenButton = true;

  constructor(
    private router: Router,
    public translate: TranslateService,
    public httpService: HttpService
  ) {
    super(translate, 'message');
  }

  ngOnInit() {
    this.getListMessage();
    this.checkUserStatus();
  }

  ngAfterViewInit() {
    $.getScript('assets/js/custom.js', function () { });
  }

  getListMessage(): void {
    const formData = {
      user_no: localStorage.getItem('user_no')
    };
    this.httpService.post(this.API_URLS.getListMessage, formData).subscribe(res => {
      if (res.code === this.RESULT_CODE.success) {
        for (let i = 0; i < res.data.length; i++) {
          const item = res.data[i];
          item.CreateDateSub = new Date(item.CreateDate);
          if (item.Message !== null && item.Message.length > 85) {
            item.collapse = true;
            item.MessageSub = item.Message.substring(0, 85) + '...';
          } else {
            item.collapse = false;
            item.MessageSub = item.Message;
          }

          item.lsImage = this.strToArr(item.lsImage);
          item.lsPdf = this.strToArr(item.lsPdf);
        }
        this.lstMessage = res.data;
        this.lstMessage.sort((a, b) => {
          return new Date(b.UpdateDate).getTime() - new Date(a.UpdateDate).getTime();
        });
        this.updateMessageFlag();
      } else {
        console.log(res);
        this.requestResult.err = true;
        this.requestResult.msg = res.message;
      }
    });
  }

  checkUserStatus(): void {
    const searchFamily = {
      family_no: localStorage.getItem('user_family_no')
    };
    this.httpService.post(this.API_URLS.getInfoFamily, searchFamily).subscribe(res => {
      if (res.code === this.RESULT_CODE.success) {
        if (res.data.ShokenBunsekiF === null || res.data.ShokenBunsekiF === '' || res.data.ShokenBunsekiF === 0) {
          this.hiddenButton = false;
        } else {
          this.hiddenButton = true;
        }
      } else {
        console.log(res);
      }
    });
  }

  goAnalyzer(): void {
    this.router.navigate(['/' + this.ROUTER_URL.analyzer]);
  }

  updateMessageFlag(): void {
    const formData = {
      user_no: localStorage.getItem('user_no')
    };
    this.httpService.post(this.API_URLS.updateMessageFlag, formData).subscribe(res => {
      if (res.code === this.RESULT_CODE.success) {
        window['headerComponent'].componentFn();
      } else {
        console.log(res);
        this.requestResult.err = true;
        this.requestResult.msg = res.message;
      }
    });
  }

  getFilePdf(fileName: string): void {
    const formData = {
      file_name: fileName
    };

    this.httpService.postBlob(this.API_URLS.getFilePdf, formData).subscribe(res => {
      const file = new Blob([res], { type: 'application/pdf' });
      const fileURL = URL.createObjectURL(file);
      window.open(fileURL);
    });
  }

  strToArr(str): any {
    if (str !== null) {
      let arrReturn = JSON.parse(str.replace(/(\r\n\t|\n|\r\t)/gm,"<br />"));
      return arrReturn;
    }
    else {
      return [];
    }
  }

  viewImage(fileId) {
    window.open(this.urlAPI + 'api/getMessageImg?file_id=' + fileId + '&token=' + this.token + '&' + this.random);
  }
}
