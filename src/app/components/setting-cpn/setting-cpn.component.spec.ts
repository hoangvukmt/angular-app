import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingCpnComponent } from './setting-cpn.component';

describe('SettingCpnComponent', () => {
  let component: SettingCpnComponent;
  let fixture: ComponentFixture<SettingCpnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingCpnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingCpnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
