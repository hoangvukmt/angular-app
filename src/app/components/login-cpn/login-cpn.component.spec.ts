import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginCpnComponent } from './login-cpn.component';

describe('LoginCpnComponent', () => {
  let component: LoginCpnComponent;
  let fixture: ComponentFixture<LoginCpnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginCpnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginCpnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
