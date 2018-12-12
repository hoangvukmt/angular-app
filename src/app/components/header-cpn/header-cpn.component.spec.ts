import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderCpnComponent } from './header-cpn.component';

describe('HeaderCpnComponent', () => {
  let component: HeaderCpnComponent;
  let fixture: ComponentFixture<HeaderCpnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderCpnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderCpnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
