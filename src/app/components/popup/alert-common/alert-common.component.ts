import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-alert-common',
  templateUrl: './alert-common.component.html',
  styleUrls: ['./alert-common.component.css']
})
export class AlertCommonComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AlertCommonComponent>,
  ) { 
  }

  ngOnInit() {
  }

  closePopup(): void{
    this.dialogRef.close();
  }

}
