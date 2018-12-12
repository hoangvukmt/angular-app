import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterCpnComponent } from './register-cpn.component';

describe('RegisterCpnComponent', () => {
  let component: RegisterCpnComponent;
  let fixture: ComponentFixture<RegisterCpnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterCpnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterCpnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
