import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertCommonComponent } from './alert-common.component';

describe('AlertCommonComponent', () => {
  let component: AlertCommonComponent;
  let fixture: ComponentFixture<AlertCommonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertCommonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertCommonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
