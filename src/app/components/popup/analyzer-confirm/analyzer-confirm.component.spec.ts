import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyzerConfirmComponent } from './analyzer-confirm.component';

describe('AnalyzerConfirmComponent', () => {
  let component: AnalyzerConfirmComponent;
  let fixture: ComponentFixture<AnalyzerConfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnalyzerConfirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalyzerConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
