import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConversorListComponent } from './conversor-list.component';
import { SharedModule } from '../shared/shared.module';
import { DialogComponent } from './dialog/dialog.component';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
  ],
  declarations: [ConversorListComponent, DialogComponent]
})
export class ConversorListModule { }
