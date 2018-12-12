import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from './../../core/service/http.service';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { BaseCpnComponent } from '../../core/base-cpn/base-cpn.component';

@Component({
  selector: 'app-view-agency-info',
  templateUrl: './view-agency-info.component.html',
  styleUrls: ['./view-agency-info.component.css']
})
export class ViewAgencyInfoComponent extends BaseCpnComponent implements OnInit {
  param: number;
  detailAgent: any;
  constructor(
    public translate: TranslateService,
    public httpService: HttpService,
    public route: ActivatedRoute,
    public router: Router
  ) {
    super(translate, 'view-agency');
  }

  ngOnInit() {
    this.route.params.subscribe(paramsId => {
      this.param = Number(paramsId.id);
      this.callGetDetailAgent(this.param);
    });
  }

  callGetDetailAgent(agentNo: number) {
    this.httpService.post(this.API_URLS.getInfoAgent, {agent_no: agentNo}).subscribe(res => {
      if (res.code === this.RESULT_CODE.success) {
        this.detailAgent = res.data;
      } else {
        this.requestResult.err = true;
        this.requestResult.msg = res.message;
      }
    });
  }

  doBack() {
    this.router.navigate([localStorage.getItem('pre-page-view-agent')]);
  }
}
