import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';

import { BaseCpnComponent } from '../../../core/base-cpn/base-cpn.component';

@Component({
  selector: 'app-confirm-common',
  templateUrl: './confirm-common.component.html',
  styleUrls: ['./confirm-common.component.css']
})
export class ConfirmCommonComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ConfirmCommonComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public translate: TranslateService
  ) {
  }

  ngOnInit() {
  }

  doAccept(): void {
    this.dialogRef.close('OK');
  }

  doCancel(): void {
    this.dialogRef.close('cancel');
  }

}
