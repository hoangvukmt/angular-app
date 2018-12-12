import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectImgComponent } from './select-img.component';

describe('SelectImgComponent', () => {
  let component: SelectImgComponent;
  let fixture: ComponentFixture<SelectImgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectImgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
