import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ConversorListComponent } from './conversor-list/conversor-list.component';
import { ConversorCalcComponent } from './conversor-calc/conversor-calc.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ButtonNumberComponent } from './conversor-calc/button-number/button-number.component';
import { RouteReuseStrategy } from '@angular/router';
import { CustomReuseStrategy } from './shared/routing/routing-strategy';




@NgModule({

  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    HttpClientModule,
    FlexLayoutModule,
  ],
  declarations: [
    AppComponent,
    ConversorListComponent,
    ConversorCalcComponent,
    ButtonNumberComponent,
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: CustomReuseStrategy },
  ],
  bootstrap: [
    AppComponent,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
  ],
})
export class AppModule { }
