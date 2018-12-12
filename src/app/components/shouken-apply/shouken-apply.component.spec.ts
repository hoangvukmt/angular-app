import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoukenApplyComponent } from './shouken-apply.component';

describe('ShoukenApplyComponent', () => {
  let component: ShoukenApplyComponent;
  let fixture: ComponentFixture<ShoukenApplyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShoukenApplyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoukenApplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
