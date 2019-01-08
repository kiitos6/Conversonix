import { Component, OnInit } from '@angular/core';
import { Currency } from '../shared/models/currency';
import { ConversorService } from '../services/conversor.service';
import { currencies } from './currencies';
import { MatDialog } from '@angular/material';
import { DialogComponent } from './dialog/dialog.component';

@Component({
  selector: 'app-conversor-list',
  templateUrl: './conversor-list.component.html',
  styleUrls: ['./conversor-list.component.scss']
})
export class ConversorListComponent implements OnInit {

  currrencyList: Currency[];
  euroBase = {EUR: 1};
  base = 'EUR';
  currenciesData = currencies;
  loader: boolean;

  constructor(private conversorService: ConversorService, public dialog: MatDialog) { }

  ngOnInit() {
    this.getCurrencyList(this.base);
  }

  openDialog(value: string): void {
    console.log(value);
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '350px',
      data: {base: this.base, currencyValue: value}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        switch (result.action) {
          case 'change_base': {
            this.getCurrencyList(result.currencyValue);
          }
        }
      }
    });
  }

  changeBase(): void {
    console.log('Selecting new Base');
  }

  getCurrencyList(currency: string): void {
    this.loader = true;
    this.conversorService.getCurrencyList(currency).subscribe(data => {
      this.loader = false;
      this.currrencyList = data.rates;
      this.base = data.base;
      if (data.base === 'EUR') {
        this.currrencyList = Object.assign(this.currrencyList, this.euroBase);
      }
    });
  }
}
