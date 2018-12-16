import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonNumberComponent } from './button-number.component';

describe('ButtonNumberComponent', () => {
  let component: ButtonNumberComponent;
  let fixture: ComponentFixture<ButtonNumberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ButtonNumberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
