import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { HttpService } from '../../core/service/http.service';
import { BaseCpnComponent } from '../../core/base-cpn/base-cpn.component';

declare var $: any;
@Component({
  selector: 'app-login-cpn',
  templateUrl: './login-cpn.component.html',
  styleUrls: ['./login-cpn.component.css']
})
export class LoginCpnComponent extends BaseCpnComponent implements OnInit {
  userNameFormControl = new FormControl('', [
    Validators.required
  ]);
  passWordFormControl = new FormControl('', [
    Validators.required
  ]);
  listFamily = [];
  constructor(
    private router: Router,
    public httpService: HttpService,
    public translate: TranslateService
  ) {
    super(translate, 'login');
  }

  ngOnInit() {
    localStorage.clear();
    localStorage.setItem('router-register', '');
  }

  ngAfterViewInit() {
    $('.vnext-form-control').keypress(function(e) {
      var c = e.key;
      if (c === "Enter") {
        $('.btn-enter').click();
      }
    });
  }
  
  doLogin(): void {
    const formData = {
      login_id: this.userNameFormControl.value,
      password: this.passWordFormControl.value
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
        localStorage.setItem('checkboxStatus', res.data['hoken_shoken_f']);

        this.callApiGetFamilyAndRouter();
      } else {
        if (res.code === this.RESULT_CODE.AUTH_FAIL) {
          this.requestResult.err = true;
          this.requestResult.msg = 'メールまたはパスワードが間違っています。';
        }
      }
    });
  }

  callApiGetFamilyAndRouter() {
    this.httpService.post(this.API_URLS.getFamily, {login_id: this.userNameFormControl.value}).subscribe(res => {
      if (res.code === this.RESULT_CODE.success) {
        this.listFamily = res.data;
        localStorage.setItem('familyNo', null);
        const relations = [];
        res.data.forEach(element => {
          relations.push(element.Relation);
          if (element.Relation === 0) {
            localStorage.setItem('familyNo', element.FamilyNo);
            localStorage.setItem('personName', element.LastName + ' ' + element.FirstName);
          }
        });
        if (relations.includes(0)) {
          this.setTitleIcon(0);
          localStorage.setItem('relation', '0');
          localStorage.setItem('sex', this.checkSexOfPerson());
          this.router.navigate(['/' + this.ROUTER_URL.home]);
          return;
        }
        localStorage.setItem('relation', '0');
        this.router.navigate(['/' + this.ROUTER_URL.changePassWord]);
      } else {
        this.requestResult.err = true;
        this.requestResult.msg = res.message;
      }
    });
  }

  checkSexOfPerson(): string {
    let sex;
    this.listFamily.forEach ((element) => {
      if (element.Relation === 0) {
        sex = element.Sex;
      }
    });
    return sex;
  }


  setTitleIcon(currentRelation: number): void {
    this.listFamily.forEach((person) => {
      if (currentRelation === person.Relation) {
        localStorage.setItem('personName', person.LastName + person.FirstName);
      }
    });
}

  clearErr(): void {
    this.requestResult.err = false;
    this.requestResult.msg = '';
  }
}
