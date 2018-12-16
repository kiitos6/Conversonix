import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConversorListComponent } from './conversor-list.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
  ],
  declarations: [ConversorListComponent]
})
export class ConversorListModule { }
