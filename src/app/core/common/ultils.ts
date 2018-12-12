import {Injectable} from '@angular/core';
import {FormControl} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class Ultils {

  constructor() {
  }

  static date(fc: FormControl) {
    if (fc.value !== null) {
      var _date = fc.value._d;
      var _nowDate = new Date();
      if (typeof _date === "undefined") {
        _date = fc.value
      }
      if (_date > _nowDate) {
        return ({date: true});
      }
    } 
    return (null);
  }

  static ValidURL(fc: FormControl) {
    if (fc.value !== null && fc.value !== "") {
      let str = fc.value;
      var regexQuery = "^(https?://)?(www\\.)?([-a-z0-9]{1,63}\\.)*?[a-z0-9][-a-z0-9]{0,61}[a-z0-9]\\.[a-z]{2,6}(/[-\\w@\\+\\.~#\\?&/=%]*)?$";
      var url = new RegExp(regexQuery, "i");
      if(!url.test(str)) {
        return ({ValidURL: true});
      }
    }
    return (null);
  }

  validDateTime(fc: FormControl) {
    if (fc.value !== null) {
      var _date = fc.value._d;
      var _nowDate = new Date();
      if (typeof _date === "undefined") {
        _date = fc.value
      }
      if (_date > _nowDate) {
        return false;
      }
    } 
    return true;
  }

  dateToyyyyMMdd(dateInput): string {
    let date = dateInput._d;
    if (typeof date === "undefined") {
      date = dateInput
    }
    const MM = date.getMonth() + 1;
    const dd = date.getDate();

    return [
        date.getFullYear(),
        (MM > 9 ? '' : '0') + MM,
        (dd > 9 ? '' : '0') + dd
    ].join('-');
  }

  stringToyyyyMMdd(date): string {
    const arr = date.split('-');
    const yyyy = arr[0];
    const MM = arr[1];
    const dd = arr[2].substr(0, 2);
    return [
      yyyy,
      MM,
      dd
    ].join('/');
  }

  validateEmail(email): boolean {
    // tslint:disable-next-line:max-line-length
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
}

export interface IHash {
  [details: string]: string
}