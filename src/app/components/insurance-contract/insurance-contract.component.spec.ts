import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsuranceContractComponent } from './insurance-contract.component';

describe('InsuranceContractComponent', () => {
  let component: InsuranceContractComponent;
  let fixture: ComponentFixture<InsuranceContractComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsuranceContractComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsuranceContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
