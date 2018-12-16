import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConversorCalcComponent } from './conversor-calc.component';

describe('ConversorCalcComponent', () => {
  let component: ConversorCalcComponent;
  let fixture: ComponentFixture<ConversorCalcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConversorCalcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConversorCalcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
