import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonAuthFaceComponent } from './button-auth-face.component';

describe('ButtonAuthFaceComponent', () => {
  let component: ButtonAuthFaceComponent;
  let fixture: ComponentFixture<ButtonAuthFaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtonAuthFaceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonAuthFaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
