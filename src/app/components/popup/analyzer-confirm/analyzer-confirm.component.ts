import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';

import { BaseCpnComponent } from '../../../core/base-cpn/base-cpn.component';

@Component({
  selector: 'app-analyzer-confirm',
  templateUrl: './analyzer-confirm.component.html',
  styleUrls: ['./analyzer-confirm.component.css']
})
export class AnalyzerConfirmComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AnalyzerConfirmComponent>,
    public translate: TranslateService
  ) {
  }

  ngOnInit() {
  }

  doCancel(): void {
    this.dialogRef.close('cancel');
  }

  doAccept(): void {
    this.dialogRef.close('OK');
  }

}
