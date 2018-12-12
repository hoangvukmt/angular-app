import {CanActivate} from '@angular/router';
import {Injectable} from '@angular/core';
import { Router } from '@angular/router';

import { HttpService } from '../../core/service/http.service';
import { API_URLS, ROUTER_URL, RESULT_CODE } from '../../core/const';

@Injectable()
export class authGuard implements CanActivate {
  constructor(
    private router: Router,
    public httpService: HttpService
  ) {

  }

  canActivate() {
    if (localStorage.getItem('id_token') === null || localStorage.getItem('user_no') === null) {
      if (localStorage.getItem('router-register') === '/register') {
        this.router.navigate(['/' + ROUTER_URL.register]);
      } else {
        this.router.navigate(['/' + ROUTER_URL.login]);
      }
      return false;
    }
    if (window.location.pathname !== ("/" + ROUTER_URL.changePassWord) && window.location.pathname !== ("/" + ROUTER_URL.login) && window.location.pathname !== ("/" + ROUTER_URL.personalInfo)) {
      if (localStorage.getItem('familyNo') === null) {
        this.router.navigate(['/' + ROUTER_URL.personalInfo]);
        return false;
      }
      const formData = {
        user_no: localStorage.getItem('user_no')
      };
      this.httpService.post(API_URLS.getListFamily, formData).subscribe(res => {
        if (res.code !== RESULT_CODE.success) {
          this.router.navigate(['/' + ROUTER_URL.login]);
        }
        else {
          if (res.data.length === 0) {
            this.router.navigate(['/' + ROUTER_URL.personalInfo]);
          }
          else {
            localStorage.setItem('checkboxStatus', res.data[0].HokenShokenF);
          }
        }
      });
    }
    return true;
  }
}
