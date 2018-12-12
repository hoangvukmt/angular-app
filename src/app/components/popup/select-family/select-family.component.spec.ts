import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectFamilyComponent } from './select-family.component';

describe('SelectFamilyComponent', () => {
  let component: SelectFamilyComponent;
  let fixture: ComponentFixture<SelectFamilyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectFamilyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectFamilyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
