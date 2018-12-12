import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterCpnComponent } from './footer-cpn.component';

describe('FooterCpnComponent', () => {
  let component: FooterCpnComponent;
  let fixture: ComponentFixture<FooterCpnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FooterCpnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterCpnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
