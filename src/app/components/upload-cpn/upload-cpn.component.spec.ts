import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadCpnComponent } from './upload-cpn.component';

describe('UploadCpnComponent', () => {
  let component: UploadCpnComponent;
  let fixture: ComponentFixture<UploadCpnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadCpnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadCpnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
