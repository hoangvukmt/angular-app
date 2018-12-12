import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { HttpService } from '../../core/service/http.service';
import { BaseCpnComponent } from '../../core/base-cpn/base-cpn.component';
import { Ultils } from '../../core/common/ultils';

declare var $: any;
@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.css']
})
export class PersonalInfoComponent extends BaseCpnComponent implements OnInit, AfterViewInit {
  birthdayFormControl = new FormControl('', [
    Validators.required
  ]);
  firstNameFormControl = new FormControl('', [
    Validators.required
  ]);
  lastNameFormControl = new FormControl('', [
    Validators.required
  ]);
  sexFormControl = new FormControl('0', [
    Validators.required
  ]);
  lsSex = [];
  headerTitle: string;
  isMale = true;
  displayStep = true;
  errDate = false;
  isErr = true;
  startAt = new Date();
  birthdayNull = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public httpService: HttpService,
    public translate: TranslateService,
    public ultils: Ultils
  ) {
    super(translate, 'personal-info');
  }

  ngOnInit() {
    this.displayStep = this.route.snapshot.data['display'];
    this.headerTitle = 'ご本人設定';
  }

  ngAfterViewInit() {
    if (!this.displayStep) {
      $.getScript('assets/js/custom.js', function() {});
    }
    this.getSex();
    this.getPersonalInfo();
  }

  getSex(): void {
    var formData = {
      sel_type: 6
    };
    this.httpService.post(this.API_URLS.getSelectItem, formData).subscribe(res => {
      if (res.code === this.RESULT_CODE.success) {
        this.lsSex = res.data;
      } else {
        console.log(res);
      }
    });
  }

  getPersonalInfo() {
    const familyNo = localStorage.getItem('user_family_no');
    if (typeof familyNo !== 'undefined' && familyNo !== 'undefined' && familyNo !== null && familyNo !== 'null' && familyNo !== '') {
      const formData = {
        family_no: familyNo
      };
      this.httpService.post(this.API_URLS.getInfoFamily, formData).subscribe(res => {
        if (res.code === this.RESULT_CODE.success) {
          const item = res.data;
          if (item.Sex === '0') {
            this.isMale = true;
            this.sexFormControl.setValue('0');
          } else {
            this.isMale = false;
            this.sexFormControl.setValue('1');
          }
          this.startAt = new Date(item.Birthday);
          this.birthdayFormControl.setValue(new Date(item.Birthday));
          this.birthdayFormControl.disable();
          this.firstNameFormControl.setValue(item.FirstName);
          this.lastNameFormControl.setValue(item.LastName);
          this.isErr = false;
        } else {
          console.log(res);
        }
      });
    }
    else {
      let date = new Date();
      let year = date.getFullYear();
      let month = date.getMonth();
      let day = date.getDate();
      this.startAt = new Date(year - 30, month, day);
      this.birthdayFormControl.disable();
    }
  }

  choseSex(): void {
    if (this.sexFormControl.value === "0") {
      this.isMale = true;
    }
    else {
      this.isMale = false;
    }
  }

  doSave(navigate: boolean): void {
    const familyNo = localStorage.getItem('user_family_no');
    if (typeof familyNo !== 'undefined' && familyNo !== 'undefined' && familyNo !== null && familyNo !== 'null' && familyNo !== '') {
      const formData = {
        family_no: localStorage.getItem('user_family_no'),
        user_no: localStorage.getItem('user_no'),
        last_name: this.lastNameFormControl.value,
        first_name: this.firstNameFormControl.value,
        relation: 0,
        sex: this.isMale ? '0' : '1',
        birthday: this.ultils.dateToyyyyMMdd(this.birthdayFormControl.value),
        seq_no: 1
      };
      this.httpService.post(this.API_URLS.updateFamily, formData).subscribe(res => {
        localStorage.setItem('sex', formData.sex);
        if (res.code === this.RESULT_CODE.success) {
          if (navigate) {
            this.router.navigate(['/' + this.ROUTER_URL.startApply]);
          } else {
            this.router.navigate(['/' + this.ROUTER_URL.familyInfo]);
          }
        } else {
          console.log(res);
          this.requestResult.err = true;
          this.requestResult.msg = res.message;
        }
      });
    } else {
      const formData = {
        user_no: localStorage.getItem('user_no'),
        last_name : this.lastNameFormControl.value,
        first_name : this.firstNameFormControl.value,
        relation : '0',
        sex : this.isMale ? '0' : '1',
        birthday : this.ultils.dateToyyyyMMdd(this.birthdayFormControl.value),
        seq_no : '1'
      };
      this.httpService.post(this.API_URLS.createfamily, formData).subscribe(res => {
        if (res.code === this.RESULT_CODE.success) {
          localStorage.setItem('sex', formData.sex);
          localStorage.setItem('user_family_no', res.data);
          if (navigate) {
            this.router.navigate(['/' + this.ROUTER_URL.startApply]);
          } else {
            this.router.navigate(['/' + this.ROUTER_URL.familyInfo]);
          }
        } else {
          console.log(res);
          this.requestResult.err = true;
          this.requestResult.msg = res.message;
        }
      });
    }
  }

  doBack(page: string): void {
    if (page === 'login') {
      this.router.navigate(['/' + this.ROUTER_URL.changePassWord]);
    } else {
      this.router.navigate([localStorage.getItem('personal-prev-page')]);
    }
  }

  clearErr(): void {
    this.requestResult.err = false;
    this.requestResult.msg = '';
  }

  doUpdate(): void {
    const formData = {
      family_no: localStorage.getItem('user_family_no'),
      user_no: localStorage.getItem('user_no'),
      last_name: this.lastNameFormControl.value,
      first_name: this.firstNameFormControl.value,
      relation: 0,
      sex: this.isMale ? '0' : '1',
      birthday: this.ultils.dateToyyyyMMdd(this.birthdayFormControl.value),
      seq_no: 1
    };
    this.httpService.post(this.API_URLS.updateFamily, formData).subscribe(res => {
      if (res.code === this.RESULT_CODE.success) {
        localStorage.setItem('sex', formData.sex);
        localStorage.setItem('family-prev-page', this.router.url);
        if (!this.displayStep) {
          this.router.navigate(['/' + this.ROUTER_URL.familyList]);
        } else {
          this.router.navigate(['/' + this.ROUTER_URL.home]);
        }
      } else {
        console.log(res);
        this.requestResult.err = true;
        this.requestResult.msg = res.message;
      }
    });
  }

  dateChange(): void {
    this.requestResult.err = false;
    this.requestResult.msg = '';
    this.errDate = !this.ultils.validDateTime(this.birthdayFormControl);
  }

  openDate(): void {
    this.isErr = true;
  }

  closedDate():void {
    if (this.birthdayFormControl.value !== "") {
      this.isErr = false;
      this.birthdayNull = false;
    }
    else {
      this.birthdayNull = true;
      this.isErr = true;
    }
  }
}
