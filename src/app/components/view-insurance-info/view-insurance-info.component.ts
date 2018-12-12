import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { BaseCpnComponent } from '../../core/base-cpn/base-cpn.component';
import { HttpService } from '../../core/service/http.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-view-insurance-info',
  templateUrl: './view-insurance-info.component.html',
  styleUrls: ['./view-insurance-info.component.css']
})
export class ViewInsuranceInfoComponent extends BaseCpnComponent implements OnInit {
  param: number;
  detailKeiyaku: any;
  constructor(
    public translate: TranslateService,
    public httpService: HttpService,
    public route: ActivatedRoute,
    public router: Router
  ) {
    super(translate, 'view-insurance-info');
  }

  ngOnInit() {
    this.route.params.subscribe(paramsId => {
      this.param = Number(paramsId.id);
      this.callGetDetailKeiyaku(this.param);
    });
  }

  callGetDetailKeiyaku(keiyakuNo: number) {
    this.httpService.post(this.API_URLS.getDetailKeiyaku, {keiyaku_no: keiyakuNo}).subscribe(res => {
      if (res.code === this.RESULT_CODE.success) {
        this.detailKeiyaku = res.data;
      } else {
        this.requestResult.err = true;
        this.requestResult.msg = res.message;
      }
    });
  }

  doBack() {
    this.router.navigate(['/' + this.ROUTER_URL.insuranceInfo + '/' + this.param]);
  }
}
