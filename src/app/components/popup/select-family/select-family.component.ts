import { Component, OnInit, Inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { BaseCpnComponent } from '../../../core/base-cpn/base-cpn.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { GlobalsHome } from '../../../core/service/global-variables';
import { LIST_SRC } from '../../../core/const';

@Component({
  selector: 'app-select-family',
  templateUrl: './select-family.component.html',
  styleUrls: ['./select-family.component.css']
})
export class SelectFamilyComponent implements OnInit {
  listFamily = [];
  srcs = LIST_SRC;
  sex = '';
  constructor(public dialogRef: MatDialogRef<SelectFamilyComponent>,
    public translate: TranslateService,
    private globalsHome: GlobalsHome,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
    this.sex = localStorage.getItem('sex');
    this.listFamily = this.data.listFamily;
  }

  setCurrentRelation(person: any): void {
    this.dialogRef.close(person);
  }

  closeDialog(): void {
    this.dialogRef.close('close');
  }
}
