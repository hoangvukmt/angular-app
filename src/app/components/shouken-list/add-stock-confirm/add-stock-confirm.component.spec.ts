import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStockConfirmComponent } from './add-stock-confirm.component';

describe('AddStockConfirmComponent', () => {
  let component: AddStockConfirmComponent;
  let fixture: ComponentFixture<AddStockConfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddStockConfirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddStockConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
