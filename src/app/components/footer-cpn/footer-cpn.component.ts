import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

import { ROUTER_URL } from '../../core/const';

@Component({
  selector: 'app-footer-cpn',
  templateUrl: './footer-cpn.component.html',
  styleUrls: ['./footer-cpn.component.css']
})
export class FooterCpnComponent implements OnInit {
  public ROUTER_URL = ROUTER_URL;

  constructor(
    private router: Router,
    public translate: TranslateService
  ) {

  }

  ngOnInit() {
  }

  goUrl(page): void{
    switch(page) {
      case 'home':
        this.router.navigate(['/' + this.ROUTER_URL.home]);
        break;
      case 'personalInfoSetting':
        this.router.navigate(['/' + this.ROUTER_URL.personalInfoSetting]);
        break;
      case 'insuranceContract':
        this.router.navigate(['/' + this.ROUTER_URL.insuranceContract + '/all']);
        break;
      case 'familyInfoSetting':
        this.router.navigate(['/' + this.ROUTER_URL.familyInfoSetting + '/0']);
        break;
      case 'messageList':
        this.router.navigate(['/' + this.ROUTER_URL.messageList]);
        break;
      case 'agencyList':
        this.router.navigate(['/' + this.ROUTER_URL.agencyList]);
        break;
      case 'setting':
        this.router.navigate(['/' + this.ROUTER_URL.setting]);
        break;
      case 'messageSend':
        this.router.navigate(['/' + this.ROUTER_URL.messageSend]);
        break;
    }
  }

}
