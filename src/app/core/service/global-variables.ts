import { KeiyakuView } from './../model/keiyaku-view';

import { Injectable } from '@angular/core';

@Injectable()
export class GlobalsHome {
  relations = [];
  currentRelation = 0;
  listFamily = [];
  family_no = 0;
  hiho_family_no = 0;
  group_id = 0;
  category_id = 0;
  isHokenInfo = false;
  keiyaku_no = 0;
  isInsuranceType = false;
  mockKeiyaku = new KeiyakuView();
  paramCategory = null;
  currentUrl = '';
}
