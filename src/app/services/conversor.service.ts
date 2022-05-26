import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Currency } from '../shared/models/currency';
import { LatestCurrenciesResponse } from '../shared/models/latestCurrenciesResponse';
import { currencies } from '../conversor-list/currencies';

@Injectable({
  providedIn: 'root'
})
export class ConversorService {

  // apiKey: p4V17QDQyrhk78GTW0f0oZNg0kKFCfG6

  private base = '&base=';

  private symbols: string;

  private fixerUrlLatest = 'https://api.apilayer.com/exchangerates_data/latest';

  response: Observable<LatestCurrenciesResponse> ;

  constructor(private http: HttpClient) { }

  getCurrencyList(currency: string): Observable<LatestCurrenciesResponse> {
    this.readCurrencyList();

    const headers = new HttpHeaders();
    headers.append('apikey', 'p4V17QDQyrhk78GTW0f0oZNg0kKFCfG6');


    return this.http.get<LatestCurrenciesResponse>(this.fixerUrlLatest.concat('?apikey=p4V17QDQyrhk78GTW0f0oZNg0kKFCfG6').concat(this.base).concat(currency));

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
