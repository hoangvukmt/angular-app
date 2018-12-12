import { Component, OnInit, AfterViewInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { HttpService } from '../../core/service/http.service';
import { BaseCpnComponent } from '../../core/base-cpn/base-cpn.component';
import { Router } from '@angular/router';

declare var $: any;
@Component({
  selector: 'app-shouken-apply',
  templateUrl: './shouken-apply.component.html',
  styleUrls: ['./shouken-apply.component.css']
})
export class ShoukenApplyComponent extends BaseCpnComponent implements OnInit, AfterViewInit {

  constructor(
    public httpService: HttpService,
    public translate: TranslateService,
    private router: Router
  ) {
    super(translate, 'shouken-apply');
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    $.getScript('assets/js/custom.js', function() {});
  }

  doApply(): void {
    localStorage.setItem('categoryID', '0');
    if (
      typeof localStorage.getItem('familyNo') !== "undefined" && 
      localStorage.getItem('familyNo') !== null && 
      localStorage.getItem('familyNo').toString() !== "" &&
      localStorage.getItem('familyNo').toString() !== "null" &&
      typeof localStorage.getItem('personName') !== "undefined" && 
      localStorage.getItem('personName') !== null && 
      localStorage.getItem('personName').toString() !== "" &&
      localStorage.getItem('personName').toString() !== "null"
    ) {
      this.router.navigate(['/' + this.ROUTER_URL.shoukenList + '/0/true']);
    }
    else {
      this.httpService.post(this.API_URLS.getFamily, {login_id: localStorage.getItem('login_id')}).subscribe(res => {
        if (res.code === this.RESULT_CODE.success) {
          localStorage.setItem('familyNo', null);
          res.data.forEach(element => {
            if (element.Relation === 0) {
              localStorage.setItem('familyNo', element.FamilyNo);
              localStorage.setItem('personName', element.LastName + ' ' + element.FirstName);
            }
          });
          this.router.navigate(['/' + this.ROUTER_URL.shoukenList + '/0/true']);
        } else {
          this.requestResult.err = true;
          this.requestResult.msg = res.message;
        }
      });
    }
  }

  doStartNow(): void {
    this.router.navigate(['/' + this.ROUTER_URL.home]);
  }

}
