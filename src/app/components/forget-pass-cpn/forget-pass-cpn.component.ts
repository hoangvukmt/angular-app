import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { HttpService } from '../../core/service/http.service';
import { BaseCpnComponent } from '../../core/base-cpn/base-cpn.component';
import { AlertCommonComponent } from '../popup/alert-common/alert-common.component';

@Component({
  selector: 'app-forget-pass-cpn',
  templateUrl: './forget-pass-cpn.component.html',
  styleUrls: ['./forget-pass-cpn.component.css']
})
export class ForgetPassCpnComponent extends BaseCpnComponent implements OnInit {
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email
  ]);

  constructor(
    public dialog: MatDialog,
    private router: Router,
    public httpService: HttpService,
    public translate: TranslateService
  ) {
    super(translate, 'forget-pass');
  }

  ngOnInit() {
  }

  doForgetPass(): void {
    const formData = {
      email: this.emailFormControl.value
    };
    this.httpService.post(this.API_URLS.resetpass, formData).subscribe(res => {
      if (res.code === this.RESULT_CODE.success) {
        const dialogAlert = this.dialog.open(AlertCommonComponent, {
          width: '400px',
          data: { popupContent: '仮パスワードを再発行しました。' },
          panelClass: ['remodal-wrapper', 'remodal-is-opened', 'custom-modal']
        });
        dialogAlert.afterClosed().subscribe(result => {
          this.router.navigate(['/' + this.ROUTER_URL.login]);
        });
      } else {
        if (res.code === this.RESULT_CODE.NOT_EXIST) {
          this.requestResult.err = true;
          this.requestResult.msg = 'メールアドレスは存在しません。';
          return;
        }
        this.requestResult.err = true;
        this.requestResult.msg = res.message;
      }
    });
  }

  doBack(): void {
    this.router.navigate(['/' + this.ROUTER_URL.login]);
  }

  clearErr(): void {
    this.requestResult.err = false;
    this.requestResult.msg = '';
  }
}
