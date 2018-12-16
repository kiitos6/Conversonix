import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Currency } from '../shared/models/currency';
import { ConversorService } from '../services/conversor.service';
import { SharedModule } from '../shared/shared.module';
import { Subject } from 'rxjs';
import { HostListener } from '@angular/core';
import { MatButton } from '@angular/material';

@Component({
  selector: 'app-conversor-calc',
  templateUrl: './conversor-calc.component.html',
  styleUrls: ['./conversor-calc.component.scss']
})
export class ConversorCalcComponent implements OnInit {

  @Input() resultAmount = 0;
  amount = '0';
  // numbers = [];
  currrencyList: Currency[];
  loader: boolean;
  @Input() baseFrom: string;
  @Input() currencyTo: string;
  numberLabels =  [];
  zeroClass = 'zero mat-button';
  numbersClass = 'numbers mat-button';


  constructor(private conversorService: ConversorService) {
   }

  ngOnInit() {
    this.getCurrencyList();
    this.createGridTable();
  }

  getCurrencyList(): void {
    this.loader = true;
    this.conversorService.getCurrencyList().subscribe(data => {
      this.loader = false;
      this.currrencyList = data.rates;
    });
  }

  createGridTable(): void {
    for (let i = 0; i < 9; i++) {
      this.numberLabels.push(i + 1);
    }
  }

  updateDisplay(number): void {
    if (this.amount.startsWith('0')) {
      this.amount = '';
    }
    this.amount = this.amount.concat(number);
    this.getConversion();
    console.log(number);
  }

  resetDisplay(): void {
    this.amount = '0';
  }

  delete(): void {
    if (!this.amount.startsWith('0')) {
      this.amount = this.amount.slice(0, this.amount.length - 1);
    }
  }

  setBaseFrom(base): void {
    this.baseFrom = base;
    console.log(this.baseFrom);
  }

  setCurrencyTo(currency): void {
    this.currencyTo = currency;
    console.log(this.currencyTo);
  }

  getConversion(): void {


  }


}
