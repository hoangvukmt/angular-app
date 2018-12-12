import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsuranceInfoEditComponent } from './insurance-info-edit.component';

describe('InsuranceInfoEditComponent', () => {
  let component: InsuranceInfoEditComponent;
  let fixture: ComponentFixture<InsuranceInfoEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsuranceInfoEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsuranceInfoEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
