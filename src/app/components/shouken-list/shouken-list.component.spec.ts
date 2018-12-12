import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoukenListComponent } from './shouken-list.component';

describe('ShoukenListComponent', () => {
  let component: ShoukenListComponent;
  let fixture: ComponentFixture<ShoukenListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShoukenListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoukenListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
