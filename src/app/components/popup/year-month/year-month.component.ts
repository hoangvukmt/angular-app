import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { MatDatepicker } from '@angular/material/datepicker';
import { FormControl } from '@angular/forms';

import { HttpService } from './../../../core/service/http.service';

export const MY_FORMATS = {
  parse: {
    dateInput: 'YYYY/MM',
  },
  display: {
    dateInput: 'YYYY年MM月',
    monthYearLabel: 'YYYY MMM',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY MMMM',
  },
};

@Component({
  selector: 'app-year-month',
  templateUrl: './year-month.component.html',
  styleUrls: ['./year-month.component.css'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ]
})
export class YearMonthComponent implements OnInit {
  @Input() keiyakuDetail: any;
  @Input() fieldDisplay = {
    name: '', 
    display: false, 
    text: '', 
    type: 0, 
    required: 0, 
    selType: 0,
    listData: []
  };
  @Input() formModel: FormControl;
  @Input() secondModel: FormControl;
  @Output() eventOut = new EventEmitter<any>();

  public moneyNumber: number;

  constructor(
    public httpService: HttpService
  ) { }

  ngOnInit() {
  }

  doEventOut() {
    this.eventOut.emit();
  }

  chosenYearHandler(normalizedYear: any) {
  }

  chosenMonthHandler(normlizedMonth: any, datepicker: MatDatepicker<any>) {
    let date = normlizedMonth._i.year + '/' + (normlizedMonth._i.month + 1) + '/' + normlizedMonth._i.date;
    this.formModel.setValue(new Date(date));
    datepicker.close();
  }

}
