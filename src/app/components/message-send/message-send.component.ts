import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { HttpService } from '../../core/service/http.service';
import { BaseCpnComponent } from '../../core/base-cpn/base-cpn.component';
import { AlertCommonComponent } from '../popup/alert-common/alert-common.component';

declare var $: any;
@Component({
  selector: 'app-message-send',
  templateUrl: './message-send.component.html',
  styleUrls: ['./message-send.component.css']
})
export class MessageSendComponent extends BaseCpnComponent implements OnInit, AfterViewInit {
  headerTitle = '新規お問合せ';
  titleFormControl = new FormControl('', [
    Validators.required
  ]);
  messageFormControl = new FormControl('', [
  ]);

  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    public httpService: HttpService,
    public translate: TranslateService
  ) {
    super(translate, 'message');
  }

  ngOnInit() {
    
  }

  ngAfterViewInit() {
    $.getScript('assets/js/custom.js', function() {});
  }

  doBack() {
    this.router.navigate([localStorage.getItem('message-prev-page')]);
  }

  doSave() {
    var formData = {
      user_no: localStorage.getItem('user_no'),
      message_title: this.titleFormControl.value,
      message: this.messageFormControl.value,
      message_type: 0,
      displayed: 1
    }
    this.httpService.post(this.API_URLS.createMessage, formData).subscribe(res => {
      if (res.code === this.RESULT_CODE.success) {
        const dialogAlert = this.dialog.open(AlertCommonComponent, {
          width: '400px',
          data: { popupContent: 'お問い合わせありがとうございました<br />営業日以内に回答いたします' },
          panelClass: ['remodal-wrapper', 'remodal-is-opened', 'custom-modal']
        });

        dialogAlert.afterClosed().subscribe(result => {
          this.router.navigate([localStorage.getItem('message-prev-page')]);
        });
      } else {
        console.log(res);
        this.requestResult.err = true;
        this.requestResult.msg = res.message;
      }
    });
  }
}
