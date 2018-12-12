import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';

import { HttpService } from './../../core/service/http.service';
import { API_URLS, ROUTER_URL, RESULT_CODE } from '../../core/const';
import { environment } from './../../../environments/environment';
import { AnalyzerConfirmComponent } from '../popup/analyzer-confirm/analyzer-confirm.component';

declare var $: any;
@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {
  @Input() bottomMargin: boolean;
  listImage = [];
  urlAPI = environment.apiUrl;
  token = localStorage.getItem('id_token');
  showControll = false;

  constructor(
    public dialog: MatDialog,
    public router: Router,
    public route: ActivatedRoute,
    private activatedRoute: ActivatedRoute,
    public httpService: HttpService
  ) { }

  ngOnInit() {
    if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      this.showControll = true;
    } else {
      this.showControll = false;
    }
  }

  ngAfterViewInit() {
    let objSearch = {};
    let api = "";
    let endIndex = this.router.url.lastIndexOf('?') === - 1 ? this.router.url.length : this.router.url.lastIndexOf('?');
    let urlCheck = this.router.url.substr(1, endIndex);
    let _endIndex = urlCheck.indexOf("/") === - 1 ? urlCheck.length : urlCheck.indexOf("/");
    urlCheck = urlCheck.substr(0, _endIndex);

    //#region Register -----------------------------------------------------------------------------------
    if (urlCheck === ROUTER_URL.register) {
      let agentCd = "";
      this.activatedRoute.queryParams.subscribe(params => {
        if (typeof params["agentCd"] !== "undefined") {
          agentCd = params["agentCd"];
        }
        else {
          agentCd = 'ACEL';
        }
      });
      objSearch = {
        disp_id: "apl01",
        agent_cd: agentCd
      }
      api = API_URLS.getPageBanner;
    }
    //#endregion
    //#region Login --------------------------------------------------------------------------------------
    else if (urlCheck === ROUTER_URL.login){
      objSearch = {
        disp_id: "apl02"
      }
      api = API_URLS.getPageBanner;
    }
    //#endregion
    //#region Forget pass --------------------------------------------------------------------------------
    else if (urlCheck === ROUTER_URL.forgetPass){
      objSearch = {
        disp_id: "psw01"
      }
      api = API_URLS.getPageBanner;
    }
    //#endregion
    //#region Change pass --------------------------------------------------------------------------------
    else if (urlCheck === ROUTER_URL.changePass){
      objSearch = {
        disp_id: "psw02",
        agent_cd: localStorage.getItem('user_agent_cd')
      }
      api = API_URLS.getListBanner;
    }
    //#endregion
    //#region Personal info ------------------------------------------------------------------------------
    else if (urlCheck === ROUTER_URL.personalInfo){
      objSearch = {
        disp_id: "fam01",
        agent_cd: localStorage.getItem('user_agent_cd')
      }
      api = API_URLS.getListBanner;
    }
    //#endregion
    //#region Family info --------------------------------------------------------------------------------
    else if (urlCheck === ROUTER_URL.familyInfo){
      objSearch = {
        disp_id: "fam02",
        agent_cd: localStorage.getItem('user_agent_cd')
      }
      api = API_URLS.getListBanner;
    }
    //#endregion
    //#region Family list --------------------------------------------------------------------------------
    else if (urlCheck === ROUTER_URL.familyList){
      objSearch = {
        disp_id: "fam03",
        agent_cd: localStorage.getItem('user_agent_cd')
      }
      api = API_URLS.getListBanner;
    }
    //#endregion
    //#region Personal info setting ----------------------------------------------------------------------
    else if (urlCheck === ROUTER_URL.personalInfoSetting){
      objSearch = {
        disp_id: "fam04",
        agent_cd: localStorage.getItem('user_agent_cd')
      }
      api = API_URLS.getListBanner;
    }
    //#endregion
    //#region Family info setting ------------------------------------------------------------------------
    else if (urlCheck === ROUTER_URL.familyInfoSetting){
      objSearch = {
        disp_id: "fam05",
        agent_cd: localStorage.getItem('user_agent_cd')
      }
      api = API_URLS.getListBanner;
    }
    //#endregion
    //#region Start apply --------------------------------------------------------------------------------
    else if (urlCheck === ROUTER_URL.startApply){
      objSearch = {
        disp_id: "img01",
        agent_cd: localStorage.getItem('user_agent_cd')
      }
      api = API_URLS.getListBanner;
    }
    //#endregion
    //#region Shouken list and Shouken list relation -----------------------------------------------------
    else if (urlCheck === ROUTER_URL.shoukenList){
      this.route.params.subscribe(paramsId => {
        if (paramsId.status !== 'relation') {
          objSearch = {
            disp_id: "img02",
            agent_cd: localStorage.getItem('user_agent_cd')
          }
          api = API_URLS.getListBanner;
        }
        else {
          objSearch = {
            disp_id: "img04",
            agent_cd: localStorage.getItem('user_agent_cd')
          }
          api = API_URLS.getListBanner;
        }
      });
    }
    //#endregion
    //#region Shouken detail -----------------------------------------------------------------------------
    else if (urlCheck === ROUTER_URL.shoukenDetail){
      objSearch = {
        disp_id: "img03",
        agent_cd: localStorage.getItem('user_agent_cd')
      }
      api = API_URLS.getListBanner;
    }
    //#endregion
    //#region Insurance contract -------------------------------------------------------------------------
    else if (urlCheck === ROUTER_URL.insuranceContract){
      objSearch = {
        disp_id: "kei01",
        agent_cd: localStorage.getItem('user_agent_cd')
      }
      api = API_URLS.getListBanner;
    }
    //#endregion
    //#region Insurance type -----------------------------------------------------------------------------
    else if (urlCheck === ROUTER_URL.insuranceType){
      objSearch = {
        disp_id: "kei02",
        agent_cd: localStorage.getItem('user_agent_cd')
      }
      api = API_URLS.getListBanner;
    }
    //#endregion
    //#region Insurance info -----------------------------------------------------------------------------
    else if (urlCheck === ROUTER_URL.insuranceInfo){
      objSearch = {
        disp_id: "kei03",
        agent_cd: localStorage.getItem('user_agent_cd')
      }
      api = API_URLS.getListBanner;
    }
    //#endregion
    //#region Insurance info edit ------------------------------------------------------------------------
    else if (urlCheck === ROUTER_URL.insuranceInfoEdit){
      objSearch = {
        disp_id: "kei04",
        agent_cd: localStorage.getItem('user_agent_cd')
      }
      api = API_URLS.getListBanner;
    }
    //#endregion
    //#region Home ---------------------------------------------------------------------------------------
    else if (urlCheck === ROUTER_URL.home){
      objSearch = {
        disp_id: "top01",
        agent_cd: localStorage.getItem('user_agent_cd')
      }
      api = API_URLS.getListBanner;
    }
    //#endregion
    //#region Analyzer -----------------------------------------------------------------------------------
    else if (urlCheck === ROUTER_URL.analyzer){
      
    }
    //#endregion
    //#region Message list -------------------------------------------------------------------------------
    else if (urlCheck === ROUTER_URL.messageList){
      objSearch = {
        disp_id: "msg01",
        agent_cd: localStorage.getItem('user_agent_cd')
      }
      api = API_URLS.getListBanner;
    }
    //#endregion
    //#region Message send -------------------------------------------------------------------------------
    else if (urlCheck === ROUTER_URL.messageSend){
      objSearch = {
        disp_id: "msg03",
        agent_cd: localStorage.getItem('user_agent_cd')
      }
      api = API_URLS.getListBanner;
    }
    //#endregion
    //#region Agentcy list -------------------------------------------------------------------------------
    else if (urlCheck === ROUTER_URL.agencyList){
      objSearch = {
        disp_id: "agt01",
        agent_cd: localStorage.getItem('user_agent_cd')
      }
      api = API_URLS.getListBanner;
    }
    //#endregion
    //#region Agentcy info edit --------------------------------------------------------------------------
    else if (urlCheck === ROUTER_URL.agencyInfoEdit){
      objSearch = {
        disp_id: "agt02",
        agent_cd: localStorage.getItem('user_agent_cd')
      }
      api = API_URLS.getListBanner;
    }
    //#endregion
    //#region Setting ------------------------------------------------------------------------------------
    else if (urlCheck === ROUTER_URL.setting){
      objSearch = {
        disp_id: "sys01",
        agent_cd: localStorage.getItem('user_agent_cd')
      }
      api = API_URLS.getListBanner;
    }
    //#endregion
    //#region Setting info -------------------------------------------------------------------------------
    else if (urlCheck === ROUTER_URL.settingInfo){
      let id = +this.route.snapshot.paramMap.get('id');
      let _disp_id = "sys02";
      switch (id) {
        case 1:
          _disp_id = "sys02";
          break;
        case 2:
          _disp_id = "sys03";
          break;
        case 3:
          _disp_id = "sys04";
          break;
        case 4:
          _disp_id = "sys05";
          break;
        case 5:
          _disp_id = "sys06";
          break;
      }
      objSearch = {
        disp_id: _disp_id,
        agent_cd: localStorage.getItem('user_agent_cd')
      }
      api = API_URLS.getListBanner;
    }
    //#endregion
    
    if (api !== "") {
      this.httpService.post(api, objSearch).subscribe(res => {
        if (res.code === RESULT_CODE.success) {
          (window as any).stopCarousel();
          this.listImage = res.data;
          if (this.listImage.length <= 1) {
            this.showControll = false;
          }
          (window as any).carousel();
        }
        else {
          console.log(res);
        }
      });
    }
  }

  bannerClick(index: number, bannerF: number): void{
    if (bannerF === 1) {
      this.router.navigate(['/' + ROUTER_URL.analyzer]);
    }
    else if (bannerF === 2) {
      const dialogComfirm = this.dialog.open(AnalyzerConfirmComponent, {
        width: '400px',
        data: {},
        panelClass: ['remodal-wrapper', 'remodal-is-opened', 'custom-modal']
      });
  
      dialogComfirm.afterClosed().subscribe(result => {
        if (result && result === 'OK') {
          var formData = {
            user_no: localStorage.getItem('user_no'),
            message_type: 2,
            message_title: "「お試し証券分析」 依頼！"
          }
          this.httpService.post(API_URLS.createMessage, formData).subscribe(res => {
            if (res.code === RESULT_CODE.success) {
              
            } else {
              console.log(res);
            }
          });
        }
      });
    }
    else if (bannerF === 3) {
      localStorage.setItem('categoryID', '0');
      this.router.navigate(['/' + ROUTER_URL.shoukenList + '/0' + '/true']);
    }
  }

  changeBanner(objSearch): void {
    this.httpService.post(API_URLS.getListBanner, objSearch).subscribe(res => {
      if (res.code === RESULT_CODE.success) {
        this.listImage = res.data;
      }
      else {
        console.log(res);
      }
    });
  }
}
