import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { HttpService } from '../../core/service/http.service';
import { BaseCpnComponent } from '../../core/base-cpn/base-cpn.component';

@Component({
  selector: 'app-register-cpn',
  templateUrl: './register-cpn.component.html',
  styleUrls: ['./register-cpn.component.css']
})
export class RegisterCpnComponent extends BaseCpnComponent implements OnInit {
  registerSuccess: boolean = false;
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  agentCd: string = 'ACEL';

  constructor(
    protected router: Router,
    private activatedRoute: ActivatedRoute,
    public httpService: HttpService,
    public translate: TranslateService
  ) {
    super(translate, 'register');
    this.activatedRoute.queryParams.subscribe(params => {
      if (typeof params["agentCd"] !== "undefined") {
        this.agentCd = params["agentCd"];
      }
    });
  }

  ngOnInit() {
    localStorage.setItem('router-register', this.router.url);
  }

  doRegister(): void {
    this.registerSuccess = false;
    this.requestResult.err = false;
    const formData = {
      email: this.emailFormControl.value,
      agentCd: this.agentCd
    };
    this.httpService.post(this.API_URLS.register, formData).subscribe(res => {
      if (res.code === this.RESULT_CODE.success) {
        this.registerSuccess = true;
      } else {
        if (res.code === this.RESULT_CODE.DUPLICATE) {
          this.requestResult.err = true;
          this.requestResult.msg = 'このメールアドレスが存在しています。';
          return;
        }
        if (res.code = this.RESULT_CODE.REQUIRED) {
          this.requestResult.err = true;
          this.requestResult.msg = 'メールアドレスの形式で入力してください';
          return;
        }
        this.requestResult.err = true;
        this.requestResult.msg = res.message;
      }
    });
  }

  clearErr(): void {
    this.requestResult.err = false;
    this.requestResult.msg = '';
    this.registerSuccess = false;
  }
}
