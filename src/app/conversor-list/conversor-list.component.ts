import { Component, OnInit } from '@angular/core';
import { Currency } from '../shared/models/currency';
import { ConversorService } from '../services/conversor.service';
import { currencies } from './currencies';
import { MatDialog, MatSnackBar } from '@angular/material';
import { DialogComponent } from './dialog/dialog.component';

@Component({
  selector: 'app-conversor-list',
  templateUrl: './conversor-list.component.html',
  styleUrls: ['./conversor-list.component.scss']
})
export class ConversorListComponent implements OnInit {

  currrencyList: Currency[];
  currencyFavList: Map<string, number> = new Map();
  euroBase = {EUR: 1};
  base = 'EUR';
  currenciesData = currencies;
  loader: boolean;

  constructor(private conversorService: ConversorService, public dialog: MatDialog, public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.getCurrencyList(this.base);
  }

  actionSelect(currInfo: string, currValue: number): void {
    let fav = false;

    if (this.currencyFavList.has(currInfo)) {
      fav = true;
    }
    this.openDialog(currInfo, currValue, fav);
  }

  openDialog(currInfo: string, currValue: number, favorite: boolean ): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '350px',
      data: {base: this.base, currencyInfo: currInfo, currencyValue: currValue, currenciesData: this.currenciesData, favorite: favorite}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        switch (result.action) {
          case 'change_base': {
            this.getCurrencyList(result.currencyInfo);
            break;
          }
          case 'add_favorite': {
            const keyName = result.currencyInfo;
            const keyValue = result.currencyValue;

            if (!this.currencyFavList.has(keyName)) {
              this.currencyFavList.set(keyName, keyValue);
            }
            console.log(this.currencyFavList);
            break;
          }
          case 'remove_favorite': {
            this.currencyFavList.delete(result.currencyInfo);
            console.log(this.currencyFavList);
          }
        }
      }
    });
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

      if (this.currencyFavList.size > 0) {
        this.currencyFavList.forEach((value: number, key: string) => {
          this.currencyFavList.set(key, this.currrencyList[key]);
          console.log(key); });
      }
      console.log(this.currrencyList);
    });
  }

  showFeedBackNotificacion(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
