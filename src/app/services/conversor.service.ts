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

  private API_KEY = '8acb8e2d65f59ae3a820461933e65892';

  private baseEur = '&base=EUR';

  private symbols: string;

  private fixerUrlLatest = 'http://data.fixer.io/api/latest?access_key='.concat(this.API_KEY);

  private fixerUrlConvert = 'http://data.fixer.io/api/convert?access_key='.concat(this.API_KEY);

  private baseFrom = '&from=';

  private currencyTo = '&to=';

  private amount = '&amount=';

  response: Observable<LatestCurrenciesResponse> ;

  conversionResponse: Observable<ConversionResponse>;

  constructor(private http: HttpClient) { }

  getCurrencyList(): Observable<LatestCurrenciesResponse> {
    this.readCurrencyList();
   return this.http.get<LatestCurrenciesResponse>(this.fixerUrlLatest.concat(this.baseEur).concat(this.symbols));
  }

  readCurrencyList(): string {
    this.symbols = '&symbols=';
    Object.keys(currencies).forEach(
      (currency: string) => this.symbols = this.symbols.concat(currency).concat(',')
    );

    return this.symbols;
  }

}
