import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmCommonComponent } from './confirm-common.component';

describe('ConfirmCommonComponent', () => {
  let component: ConfirmCommonComponent;
  let fixture: ComponentFixture<ConfirmCommonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmCommonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmCommonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
