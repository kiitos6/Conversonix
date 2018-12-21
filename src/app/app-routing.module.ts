import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ConversorListComponent } from './conversor-list/conversor-list.component';
import { ConversorCalcComponent } from './conversor-calc/conversor-calc.component';


const routes: Routes = [
  { path: '', redirectTo: '/calc', pathMatch: 'full' },
  { path: 'list', component: ConversorListComponent },
  { path: 'calc', component: ConversorCalcComponent },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),

  ],
  exports: [
    RouterModule,
  ],
  declarations: [],
})
export class AppRoutingModule { }
