import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgencyInfoEditComponent } from './agency-info-edit.component';

describe('AgencyInfoEditComponent', () => {
  let component: AgencyInfoEditComponent;
  let fixture: ComponentFixture<AgencyInfoEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgencyInfoEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgencyInfoEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
