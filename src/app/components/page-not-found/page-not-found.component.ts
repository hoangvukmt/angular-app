import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { API_URLS, ROUTER_URL, RESULT_CODE } from '../../core/const';
declare var $: any;
@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent  implements OnInit {

  public ROUTER_URL = ROUTER_URL;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) {
  }

  ngOnInit() {
    if (localStorage.getItem('router-register') === '/register') {
      this.router.navigate(['/' + this.ROUTER_URL.register]);
    } else {
      this.router.navigate(['/' + this.ROUTER_URL.login]);
    }
  }

}
