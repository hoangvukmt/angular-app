import { Injectable } from '@angular/core';

import { HttpService } from '../service/http.service';
import { API_URLS } from '../const';
import { environment } from '../../../environments/environment';

declare var $: any;
@Injectable({
  providedIn: 'root'
})

export class CommonService {

  constructor(
    public httpService: HttpService
  ) { }

  async keiyakuUploadFile(formData) {
    const enviURL = environment.apiUrl;
    let result;
    try {
      result = await $.ajax({
        url : enviURL + API_URLS.createGroup,
        type: 'POST',
        dataType: 'json',
        data: formData,
        cache : false,
        processData: false,
        contentType: false,
        headers: {
          'x-access-token': localStorage.getItem('id_token') == null ? '' : localStorage.getItem('id_token')
        }
      });
      return result;
    } catch (error) {
      console.error(error);
    }
  }

  async editImage(formData) {
    const enviURL = environment.apiUrl;
    let result;
    try {
      result = await $.ajax({
        url : enviURL + API_URLS.editImage,
        type: 'POST',
        dataType: 'json',
        data: formData,
        cache : false,
        processData: false,
        contentType: false,
        headers: {
          'x-access-token': localStorage.getItem('id_token') == null ? '' : localStorage.getItem('id_token')
        }
      });
      return result;
    } catch (error) {
      console.error(error);
    }
  }
}
