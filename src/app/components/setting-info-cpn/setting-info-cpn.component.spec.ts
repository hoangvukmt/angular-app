import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingInfoCpnComponent } from './setting-info-cpn.component';

describe('SettingInfoCpnComponent', () => {
  let component: SettingInfoCpnComponent;
  let fixture: ComponentFixture<SettingInfoCpnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingInfoCpnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingInfoCpnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
