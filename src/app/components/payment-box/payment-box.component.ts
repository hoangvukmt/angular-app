import { HttpService } from './../../core/service/http.service';
import { Component, OnInit, Output, Input, Inject, EventEmitter} from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { SelectFamilyComponent } from '../popup/select-family/select-family.component';
import { GlobalsHome } from '../../core/service/global-variables';
import { API_URLS, ROUTER_URL, RESULT_CODE } from '../../core/const';

@Component({
  selector: 'app-payment-box',
  templateUrl: './payment-box.component.html',
  styleUrls: ['./payment-box.component.css']
})
export class PaymentBoxComponent implements OnInit {
  protected API_URLS = API_URLS;
  public ROUTER_URL = ROUTER_URL;
  protected RESULT_CODE = RESULT_CODE;
  public requestResult = {
    err: false,
    msg: ''
  };
  @Input() listFamily: any[];
  @Input() mpm: any;
  @Input() mpy: any;
  @Input() person: any;
  @Input() currentRelation: number;
  @Output() changeRelation: EventEmitter<number> = new EventEmitter<number>();
  listRelations = [];
  allRelations = [];
  titleIcon = '本人';
  listFamilySort = [];
  sex = '';
  constructor(
    public dialog: MatDialog,
    private globalsHome: GlobalsHome,
    private httpService: HttpService
  ) {
  }

  ngOnInit() {
    this.sex = localStorage.getItem('sex');
    if (this.listFamily.length === 0) {
      this.callApiGetFamily();
    } else {
      this.setTitleIcon(this.person);
    }
  }

  callApiGetFamily() {
    this.httpService.post(this.API_URLS.getFamily, {login_id: localStorage.getItem('login_id')}).subscribe(res => {
      if (res.code === this.RESULT_CODE.success) {
        this.listFamily = res.data;
        this.setTitleIcon(this.person);
      } else {
        this.requestResult.err = true;
        this.requestResult.msg = res.message;
      }
    });
  }

  openModal(): void {
    const dialogRef = this.dialog.open(SelectFamilyComponent, {
      width: '400px',
      data: {
        listFamily: this.listFamily,
       },
      panelClass: ['remodal-wrapper', 'remodal-is-opened', 'custom-modal'],
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result !== 'close') {
        this.person = result;
        localStorage.setItem('relation', result.Relation);
        localStorage.setItem('familyNo', result.FamilyNo);
        this.setTitleIcon(result);
        this.changeRelation.emit(result);
      }
    });
  }

  setTitleIcon(result: any): void {
    this.titleIcon = result.FirstName;
    localStorage.setItem('personName', result.LastName + ' ' + result.FirstName);
  }
}
