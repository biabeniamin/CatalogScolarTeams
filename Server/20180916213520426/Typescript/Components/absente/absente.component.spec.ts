import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbsenteComponent } from './absente.component';

describe('AbsenteComponent', () => {
  let component: AbsenteComponent;
  let fixture: ComponentFixture<AbsenteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbsenteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbsenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
