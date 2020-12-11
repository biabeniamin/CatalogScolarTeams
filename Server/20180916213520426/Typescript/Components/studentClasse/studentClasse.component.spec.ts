import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentClasseComponent } from './studentClasse.component';

describe('StudentClasseComponent', () => {
  let component: StudentClasseComponent;
  let fixture: ComponentFixture<StudentClasseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentClasseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentClasseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
