import { Component, OnInit, Input } from '@angular/core';
import { Currency } from '../shared/models/currency';
import { ConversorService } from '../services/conversor.service';
import { FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-conversor-calc',
  templateUrl: './conversor-calc.component.html',
  styleUrls: ['./conversor-calc.component.scss']
})
export class ConversorCalcComponent implements OnInit {

  baseFrom = 'EUR';
  currencyTo = 'USD';
  resultAmount = '0';
  amount = '0';
  currrencyList: Currency[];
  loader: boolean;
  numberLabels =  [];
  zeroClass = 'zero mat-button';
  numbersClass = 'numbers mat-button';
  decimalSign = false;
  regexAmount: RegExp =  /^\d*\.?\d{0,2}$/;


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

  updateDisplay(num: string): void {

    if (this.amount.match(this.regexAmount)  !== null) {

      if (num === '.' && this.decimalSign === false) {
        this.decimalSign = true;
        this.amount = this.amount.concat(num);
      } else if (num !== '.' && this.amount === '0') {
        this.amount = '';
        this.amount = this.amount.concat(num);
      } else if (num !== '.') {
        this.amount = this.amount.concat(num);
      }
      this.getConversion();
    }
  }

  resetDisplay(): void {
    this.amount = '0';
    this.resultAmount = '0';
    this.decimalSign = false;
  }

  delete(): void {
    if (this.amount.length === 1) {
      this.amount = '0';
    } else if (this.amount !== '0') {
      if (this.amount.endsWith('.')) {
        this.decimalSign = false;
      }
      this.amount = this.amount.slice(0, this.amount.length - 1);
    }
    this.getConversion();
  }

  setBaseFrom(base: string): void {
    this.baseFrom = base;
    this.getConversion();
  }

  setCurrencyTo(currency: string): void {
    this.currencyTo = currency;
    this.getConversion();
  }

  getConversion(): void {
    const baseToConvert = this.currrencyList[this.baseFrom];
    const currencyToConvert =  this.currrencyList[this.currencyTo];
    this.resultAmount = ((+this.amount * currencyToConvert) / baseToConvert).toString();
    if (this.decimalSign) {
      this.resultAmount = this.resultAmount.substring(0, this.resultAmount.indexOf('.') + 4);
    }
  }
}
