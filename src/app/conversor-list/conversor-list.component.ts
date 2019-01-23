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
  undoSetBase: string;
  undoAddToFav: string;
  undoRemoveFav: string;
  undoAction = '';
  favListToShow = false;

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
      const addedToFav = 'Currency added to favorites';
      const removedFromFav = 'Currency removed from favorites';
      const baseCurrency = 'Base currency defined correctly';
      if (result !== undefined) {
        switch (result.action) {
          case DialogActions.Change_base: {
            this.changeDefaultBase(result.currencyInfo);
            this.showFeedbackNotificacion(baseCurrency, 'Undo');
            break;
          }
          case DialogActions.Add_favorite: {
            this.addToFavorites(result.currencyInfo, result.currencyValue);
            this.showFeedbackNotificacion(addedToFav, 'Undo');
            break;
          }
          case DialogActions.Remove_favorite: {
            this.removeFromFavorites(result.currencyInfo);
            this.showFeedbackNotificacion(removedFromFav, 'Undo');
          }
        }
      }
    });
  }

  changeDefaultBase(keyName: string) {
    this.undoSetBase = this.base;
    this.getCurrencyList(keyName);
    this.undoAction = UndoActions.Undo_change_base;
  }

  addToFavorites(keyName: string, keyValue: number) {
    this.currencyFavList = this.conversorService.addToFavorites(keyName, keyValue, this.currencyFavList);
    this.undoAddToFav = keyName;
    this.undoAction = UndoActions.Undo_add_fav;

    if (this.currencyFavList.size === 1 && this.currencyFavList.has(this.base)) {
      this.favListToShow = false;
    } else if (this.currencyFavList.size < 1 ) {
      this.favListToShow = false;
    } else {
      this.favListToShow = true;
    }
  }

  removeFromFavorites(keyName: string) {
    this.currencyFavList = this.conversorService.removeFromFavorites(keyName, this.currencyFavList);
    this.undoRemoveFav = keyName;
    this.undoAction = UndoActions.Undo_remove_fav;

    if (this.currencyFavList.size === 1 && this.currencyFavList.has(this.base)) {
      this.favListToShow = false;
    } else if (this.currencyFavList.size < 1 ) {
      this.favListToShow = false;
    } else {
      this.favListToShow = true;
    }
  }

  getCurrencyList(currency: string): void {
    this.loader = true;
    this.base = currency;
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
        });
      }
      console.log(this.currrencyList);
    });
  }

  showFeedbackNotificacion(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    }).onAction().subscribe(() => {
    switch (this.undoAction) {
      case UndoActions.Undo_change_base: {
        this.changeDefaultBase(this.undoSetBase);
        break;
      }
      case UndoActions.Undo_add_fav: {
        this.removeFromFavorites(this.undoAddToFav);
        break;
      }
      case UndoActions.Undo_remove_fav: {
        this.addToFavorites(this.undoRemoveFav, this.currrencyList[this.undoRemoveFav]);
        break;
      }
    }
    });

  }

}

enum UndoActions {
  Undo_change_base = 'UNDO_CHANGE_BASE',
  Undo_add_fav = 'UNDO_ADD_FAV',
  Undo_remove_fav = 'UNDO_REMOVE_FAV',
}

export enum DialogActions {
  Change_base = 'CHANGE_BASE',
  Add_favorite = 'ADD_FAVORITE',
  Remove_favorite = 'REMOVE_FAVORITE'

}
