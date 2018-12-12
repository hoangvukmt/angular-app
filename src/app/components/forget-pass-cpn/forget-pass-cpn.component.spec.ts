import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgetPassCpnComponent } from './forget-pass-cpn.component';

describe('ForgetPassCpnComponent', () => {
  let component: ForgetPassCpnComponent;
  let fixture: ComponentFixture<ForgetPassCpnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForgetPassCpnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgetPassCpnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
