import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewInsuranceInfoComponent } from './view-insurance-info.component';

describe('ViewInsuranceInfoComponent', () => {
  let component: ViewInsuranceInfoComponent;
  let fixture: ComponentFixture<ViewInsuranceInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewInsuranceInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewInsuranceInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
