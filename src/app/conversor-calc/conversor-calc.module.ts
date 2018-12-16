import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConversorCalcComponent } from './conversor-calc.component';
import { ButtonNumberComponent } from './button-number/button-number.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ConversorCalcComponent, ButtonNumberComponent]
})
export class ConversorCalcModule { }
