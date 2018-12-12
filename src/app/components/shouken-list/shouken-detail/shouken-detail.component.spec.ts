import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoukenDetailComponent } from './shouken-detail.component';

describe('ShoukenDetailComponent', () => {
  let component: ShoukenDetailComponent;
  let fixture: ComponentFixture<ShoukenDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShoukenDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoukenDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
