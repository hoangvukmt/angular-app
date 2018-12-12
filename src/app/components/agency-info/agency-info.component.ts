import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { HttpService } from '../../core/service/http.service';
import { BaseCpnComponent } from '../../core/base-cpn/base-cpn.component';

declare var $: any;
@Component({
  selector: 'app-agency-info',
  templateUrl: './agency-info.component.html',
  styleUrls: ['./agency-info.component.css']
})
export class AgencyInfoComponent extends BaseCpnComponent implements OnInit, AfterViewInit {
  headerTitle = "保険クリニック";
  id: number;
  agentInfo = {
    AgentName: null,
    TantoName: null,
    Phone: null,
    KeiyakuPage: null
  };
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public httpService: HttpService,
    public translate: TranslateService
  ) {
    super(translate, 'agency-info');
  }

  ngOnInit() {
    this.id = +this.route.snapshot.paramMap.get('id');
  }

  ngAfterViewInit() {
    $.getScript('assets/js/custom.js', function() {});
    this.getAgentInfo();
  }

  getAgentInfo(): void {
    var formData = {
      agent_no: this.id
    }
    this.httpService.post(this.API_URLS.getInfoAgent, formData).subscribe(res => {
      if (res.code === this.RESULT_CODE.success) {
        this.agentInfo = res.data;
      } else {
        console.log(res);
      }
    });
  }

  doBack(): void {
    this.router.navigate(['/' + this.ROUTER_URL.agencyList]);
  }

  doEdit(): void {
    this.router.navigate(['/' + this.ROUTER_URL.agencyInfoEdit + "/" + this.id]);
  }

}
