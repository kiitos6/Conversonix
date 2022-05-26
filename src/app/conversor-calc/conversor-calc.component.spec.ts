import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ConversorCalcComponent } from './conversor-calc.component';

describe('ConversorCalcComponent', () => {
  let component: ConversorCalcComponent;
  let fixture: ComponentFixture<ConversorCalcComponent>;

  beforeEach(waitForAsync(() => {
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
