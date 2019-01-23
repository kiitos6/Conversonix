import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Currency } from '../shared/models/currency';
// import { FixedSizeVirtualScrollStrategy } from '@angular/cdk/scrolling';
import { LatestCurrenciesResponse } from '../shared/models/latestCurrenciesResponse';
import { currencies } from '../conversor-list/currencies';
import { ConversionResponse } from '../shared/models/conversionResponse';

@Injectable({
  providedIn: 'root'
})
export class ConversorService {

  private base = '?base=';

  private symbols: string;

  private fixerUrlLatest = 'https://api.exchangeratesapi.io/latest';

  response: Observable<LatestCurrenciesResponse> ;

  conversionResponse: Observable<ConversionResponse>;

  constructor(private http: HttpClient) { }

  getCurrencyList(currency: string): Observable<LatestCurrenciesResponse> {
    this.readCurrencyList();
  return this.http.get<LatestCurrenciesResponse>(this.fixerUrlLatest.concat(this.base).concat(currency));

  }

  readCurrencyList(): string {
    this.symbols = '&symbols=';
    Object.keys(currencies).forEach(
      (currency: string) => this.symbols = this.symbols.concat(currency).concat(',')
    );

    return this.symbols;
  }

  addToFavorites(keyName: string, keyValue: number, currencyFavList: Map<string, number>): Map<string, number> {
    if (!currencyFavList.has(keyName)) {
      currencyFavList.set(keyName, keyValue);
    }
    return currencyFavList;
  }

  removeFromFavorites(keyName: string, currencyFavList: Map<string, number>): Map<string, number> {
    currencyFavList.delete(keyName);
    return currencyFavList;
  }


}
