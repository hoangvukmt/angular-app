import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoukenApplyCompleteComponent } from './shouken-apply-complete.component';

describe('ShoukenApplyCompleteComponent', () => {
  let component: ShoukenApplyCompleteComponent;
  let fixture: ComponentFixture<ShoukenApplyCompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShoukenApplyCompleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoukenApplyCompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
