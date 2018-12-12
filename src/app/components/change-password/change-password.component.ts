import { Router, ActivatedRoute } from '@angular/router';
import { GlobalsHome } from './../../core/service/global-variables';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { BaseCpnComponent } from '../../core/base-cpn/base-cpn.component';
import { TranslateService } from '@ngx-translate/core';
import { Validators, FormControl } from '@angular/forms';
import { HttpService } from '../../core/service/http.service';
import { lengthPasswordValidator,
        characterOtherValidator,
        notHaveEnoughtCharacterValidator } from '../../core/custom-validate/password-validate';

declare var $: any;
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})

export class ChangePasswordComponent extends BaseCpnComponent implements OnInit, AfterViewInit {
  headerTitle = 'パスワード変更';
  oldPasswordFormControl = new FormControl('', [
    Validators.required
  ]);
  newPasswordFormControl = new FormControl('', [
    Validators.required, lengthPasswordValidator, characterOtherValidator, notHaveEnoughtCharacterValidator
  ]);
  confirmPasswordFormControl = new FormControl('', [
    Validators.required
  ]);
  displayMenu = true;

  constructor(
    public translate: TranslateService,
    public httpService: HttpService,
    public globalsHome: GlobalsHome,
    public router: Router,
    private route: ActivatedRoute
  ) {
    super(translate, 'change-password');
  }

  ngOnInit() {
    this.displayMenu = this.route.snapshot.data['display'];
  }

  ngAfterViewInit() {
    $.getScript('assets/js/custom.js', function() {});
  }

  doBack(): void {
    this.router.navigate([this.globalsHome.currentUrl]);
  }

  doChangPassword(): void {
    if (this.newPasswordFormControl.value !== this.confirmPasswordFormControl.value) {
      this.requestResult.err = true;
      this.requestResult.msg = '新しいパスワードと確認用パスワードが正しくないです。';
      return;
    }
    const formData = {
      old_password: this.oldPasswordFormControl.value,
      new_password: this.newPasswordFormControl.value
    };
    this.httpService.post(this.API_URLS.changePassword, formData).subscribe(res => {
      if (res.code === this.RESULT_CODE.success) {
        this.clearErr();
        if (this.displayMenu) {
          this.doLogin(formData.new_password);
        } else {
          this.router.navigate(['/' + this.ROUTER_URL.personalInfo]);
        }
      } else {
        if (res.code === this.RESULT_CODE.AUTH_FAIL) {
          this.requestResult.err = true;
          this.requestResult.msg = '現在のパスワードが正しくありません。';
          return;
        }
        console.log(res);
        this.requestResult.err = true;
        this.requestResult.msg = res.message;
      }
    });
  }

  doLogin(newPass: any): void {
    const formData = {
      login_id: localStorage.getItem('login_id'),
      password: newPass
    };
    this.httpService.post(this.API_URLS.login, formData).subscribe(res => {
      if (res.code === this.RESULT_CODE.success) {
        localStorage.setItem('login_id', formData.login_id);
        localStorage.setItem('id_token', res.data['token']);
        localStorage.setItem('user_no', res.data['user_no']);
        localStorage.setItem('personName', '');
        localStorage.setItem('familyNo', res.data['family_no']);
        localStorage.setItem('user_family_no', res.data['family_no']);
        localStorage.setItem('user_agent_cd', res.data['agent_cd']);
        this.router.navigate([this.globalsHome.currentUrl]);
      } else {
        console.log(res);
        this.requestResult.err = true;
        this.requestResult.msg = res.message;
      }
    });
  }

  clearErr(): void {
    this.requestResult.err = false;
    this.requestResult.msg = '';
  }

}
