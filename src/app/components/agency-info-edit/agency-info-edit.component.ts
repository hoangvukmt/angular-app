import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { FormControl, Validators } from '@angular/forms';

import { HttpService } from '../../core/service/http.service';
import { BaseCpnComponent } from '../../core/base-cpn/base-cpn.component';
import { Ultils } from '../../core/common/ultils';

declare var $: any;
@Component({
  selector: 'app-agency-info-edit',
  templateUrl: './agency-info-edit.component.html',
  styleUrls: ['./agency-info-edit.component.css']
})
export class AgencyInfoEditComponent extends BaseCpnComponent implements OnInit, AfterViewInit {
  headerTitle = '代理店設定';
  id: number;
  agentInfo = {
    AgentNo: 0,
    TantoName: '',
    Phone: '',
    KeiyakuPage: '',
    Remarks: ''
  };
  agentNameFormControl = new FormControl('', [
    Validators.required
  ]);
  keiyakuPageFormControl = new FormControl('', [
    Ultils.ValidURL
  ]);

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

  doBack(): void {
    this.router.navigate(['/' + this.ROUTER_URL.agencyList]);
  }

  getAgentInfo(): void {
    if (this.id !== 0) {
      const formData = {
        agent_no: this.id
      };
      this.httpService.post(this.API_URLS.getInfoAgent, formData).subscribe(res => {
        if (res.code === this.RESULT_CODE.success) {
          this.agentInfo = res.data;
          this.agentNameFormControl.setValue(res.data.AgentName);
          this.keiyakuPageFormControl.setValue(res.data.KeiyakuPage);
        } else {
          console.log(res);
        }
      });
    }
  }

  doSave(): void {
    const formData = {
      agent_no: this.agentInfo.AgentNo,
      user_no: localStorage.getItem('user_no'),
      agent_name: this.agentNameFormControl.value,
      tanto_name: this.agentInfo.TantoName,
      phone: $('input[onfocus="addValueToNext(this)"]').val(),
      keiyaku_page: this.keiyakuPageFormControl.value,
      remarks: this.agentInfo.Remarks
    };
    if (this.id !== 0) {
      this.httpService.post(this.API_URLS.updateAgent, formData).subscribe(res => {
        if (res.code === this.RESULT_CODE.success) {
          this.router.navigate(['/' + this.ROUTER_URL.agencyList]);
        } else {
          console.log(res);
        }
      });
    } else {
      this.httpService.post(this.API_URLS.createAgent, formData).subscribe(res => {
        if (res.code === this.RESULT_CODE.success) {
          this.router.navigate(['/' + this.ROUTER_URL.agencyList]);
        } else {
          console.log(res);
        }
      });
    }
  }

}
