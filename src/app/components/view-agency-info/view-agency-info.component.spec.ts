import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAgencyInfoComponent } from './view-agency-info.component';

describe('ViewAgencyInfoComponent', () => {
  let component: ViewAgencyInfoComponent;
  let fixture: ComponentFixture<ViewAgencyInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewAgencyInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAgencyInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
