import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';

import { HttpService } from '../../../core/service/http.service';
import { API_URLS, RESULT_CODE } from '../../../core/const';

@Component({
  selector: 'app-add-stock-confirm',
  templateUrl: './add-stock-confirm.component.html',
  styleUrls: ['./add-stock-confirm.component.css']
})
export class AddStockConfirmComponent implements OnInit {
  ischeck = false;
  constructor(
    public dialogRef: MatDialogRef<AddStockConfirmComponent>,
    public translate: TranslateService,
    public httpService: HttpService,
  ) {
  }

  ngOnInit() {
  }

  doSave(): void {
    localStorage.setItem('checkboxStatus', this.ischeck.toString());
    if (this.ischeck) {
      let objUpdate = {
        hoken_shoken_f: 1
      }
      this.httpService.post(API_URLS.hideDialog, objUpdate).subscribe(res => {
        if (res.code === RESULT_CODE.success) {
          
        } else {
          console.log(res);
        }
      });
    }

    this.dialogRef.close('OK');
  }

  handleCheckbox(event) {
    this.ischeck = !this.ischeck;
  }
}
