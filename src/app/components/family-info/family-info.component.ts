import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { HttpService } from '../../core/service/http.service';
import { BaseCpnComponent } from '../../core/base-cpn/base-cpn.component';
import { TranslateService } from '@ngx-translate/core';
import { Ultils } from '../../core/common/ultils';

declare var $: any;
@Component({
  selector: 'app-family-info',
  templateUrl: './family-info.component.html',
  styleUrls: ['./family-info.component.css']
})
export class FamilyInfoComponent extends BaseCpnComponent implements OnInit, AfterViewInit {
  headerTitle = "ご家族設定";
  id: number;
  lstRelation = [];
  lsSex = [];
  relationFormControl = new FormControl('', [
    Validators.required
  ]);
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
  isMale = true;
  disableSex = true;
  displayStep = true;
  isOther = false;
  errDate = false;
  isErr = true;
  startAt = new Date();
  birthdayNull = false;
  lastNameDefault = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public httpService: HttpService,
    public translate: TranslateService,
    public ultils: Ultils
  ) {
    super(translate, 'family-info');
  }

  ngOnInit() {
    this.displayStep = this.route.snapshot.data['display'];
    this.id = +this.route.snapshot.paramMap.get('id');
  }

  ngAfterViewInit() {
    this.getRelation();
    this.getSex();
    if (!this.displayStep) {
      $.getScript('assets/js/custom.js', function() {});
      this.getFamilyInfo();
    }
    else {
      this.birthdayFormControl.disable();
      this.getUserInfo();
    }
  }

  getUserInfo(): void {
    const familyNo = localStorage.getItem('user_family_no');
    if (typeof familyNo !== 'undefined' && familyNo !== 'undefined' && familyNo !== null && familyNo !== 'null' && familyNo !== '') {
      const formData = {
        family_no: familyNo
      };
      this.httpService.post(this.API_URLS.getInfoFamily, formData).subscribe(res => {
        if (res.code === this.RESULT_CODE.success) {
          this.lastNameDefault = res.data.LastName;
          this.lastNameFormControl.setValue(this.lastNameDefault);
        } else {
          console.log(res);
        }
      });
    }
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

  getRelation(): void {
    var formData = {
      sel_type: 5
    };
    this.httpService.post(this.API_URLS.getSelectItem, formData).subscribe(res => {
      if (res.code === this.RESULT_CODE.success) {
        for (var i = 0; i < res.data.length; i++) {
          var item = res.data[i];
          if (item.selNo !== 0) {
            this.lstRelation.push(item);
          }
        }
      } else {
        console.log(res);
      }
    });
  }

  getFamilyInfo() {
    if (this.id !== 0) {
      var formData = {
        family_no: this.id
      };
      this.httpService.post(this.API_URLS.getInfoFamily, formData).subscribe(res => {
        if (res.code === this.RESULT_CODE.success) {
          var item = res.data;
          if (item.Sex === "0") {
            this.isMale = true;
            this.sexFormControl.setValue('0');
          }
          else {
            this.sexFormControl.setValue('1');
            this.isMale = false;
          }
          this.startAt = new Date(item.Birthday);
          this.relationFormControl.setValue(item.Relation.toString());
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
      this.getUserInfo();
    }
  }

  doBack(page: string): void {
    if (page === "personal") {
      this.router.navigate(['/' + this.ROUTER_URL.personalInfo]);
    }
    else {
      this.router.navigate(['/' + this.ROUTER_URL.familyList]);
    }
  }

  changeRelation(): void {
    this.isOther = false;
    switch (this.relationFormControl.value) {
      case '1':
      case '14':
      case '17':
        this.isMale = true;
        this.sexFormControl.setValue('0');
        this.disableSex = true;
        break;
      case '2':
      case '15':
      case '18':
        this.isMale = false;
        this.sexFormControl.setValue('1');
        this.disableSex = true;
        break;
      case '13':
        this.isMale = true;
        this.sexFormControl.setValue('0');
        this.disableSex = false;
        break;
      case '16':
        this.isMale = true;
        this.sexFormControl.setValue('0');
        this.disableSex = false;
        break;
      case '99':
        this.isMale = true;
        this.sexFormControl.setValue('0');
        this.disableSex = false;
        this.isOther = true;
        break;
      default:
        this.isMale = true;
        this.sexFormControl.setValue('0');
        this.disableSex = true;
        break;
    }
    this.requestResult.err = false;
    this.requestResult.msg = '';
  }

  choseSex(): void {
    if (this.sexFormControl.value === "0") {
      this.isMale = true;
    }
    else {
      this.isMale = false;
    }
    this.requestResult.err = false;
    this.requestResult.msg = '';
  }

  doSave(navigate: boolean): void {
    const formData = {
      user_no: localStorage.getItem('user_no'),
      last_name : this.lastNameFormControl.value,
      first_name : this.firstNameFormControl.value,
      relation : this.relationFormControl.value,
      sex : this.isMale ? '0' : '1',
      birthday : this.ultils.dateToyyyyMMdd(this.birthdayFormControl.value),
      seq_no : '1'
    };
    this.httpService.post(this.API_URLS.createfamily, formData).subscribe(res => {
      if (res.code === this.RESULT_CODE.success) {
        if (navigate) {
          this.router.navigate(['/' + this.ROUTER_URL.startApply]);
        } else {
          this.isMale = true;
          this.sexFormControl.setValue('0');
          this.relationFormControl.reset('');
          this.birthdayFormControl.reset('');
          this.firstNameFormControl.reset('');
          this.lastNameFormControl.reset(this.lastNameDefault);
        }
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

  dateChange(): void {
    this.requestResult.err = false;
    this.requestResult.msg = '';
    this.errDate = !this.ultils.validDateTime(this.birthdayFormControl);
  }

  doUpdate(): void {
    if (this.id === 0) {
      var formData = {
        user_no: localStorage.getItem('user_no'),
        last_name : this.lastNameFormControl.value,
        first_name : this.firstNameFormControl.value,
        relation : this.relationFormControl.value,
        sex : this.isMale ? '0' : '1',
        birthday : this.ultils.dateToyyyyMMdd(this.birthdayFormControl.value),
        seq_no : '1'
      };
      this.httpService.post(this.API_URLS.createfamily, formData).subscribe(res => {
        if (res.code === this.RESULT_CODE.success) {
          this.router.navigate(['/' + this.ROUTER_URL.familyList]);
        } else {
          console.log(res);
          this.requestResult.err = true;
          this.requestResult.msg = res.message;
        }
      });
    }
    else {
      var updateData = {
        family_no: this.id,
        user_no: localStorage.getItem('user_no'),
        last_name : this.lastNameFormControl.value,
        first_name : this.firstNameFormControl.value,
        relation : this.relationFormControl.value,
        sex : this.isMale ? '0' : '1',
        birthday : this.ultils.dateToyyyyMMdd(this.birthdayFormControl.value),
        seq_no : '1'
      };
      this.httpService.post(this.API_URLS.updateFamily, updateData).subscribe(res => {
        if (res.code === this.RESULT_CODE.success) {
          this.router.navigate(['/' + this.ROUTER_URL.familyList]);
        } else {
          console.log(res);
          this.requestResult.err = true;
          this.requestResult.msg = res.message;
        }
      });
    }
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
      this.isErr = true;
      this.birthdayNull = true;
    }
  }
}
