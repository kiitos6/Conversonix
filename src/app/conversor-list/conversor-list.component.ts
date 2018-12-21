import { Component, OnInit } from '@angular/core';
import { Currency } from '../shared/models/currency';
import { ConversorService } from '../services/conversor.service';
import { SharedModule } from '../shared/shared.module';
import { currencies } from './currencies';

@Component({
  selector: 'app-conversor-list',
  templateUrl: './conversor-list.component.html',
  styleUrls: ['./conversor-list.component.scss']
})
export class ConversorListComponent implements OnInit {

  currrencyList: Currency[];
  base: string;
  currenciesData = currencies;
  loader: boolean;

  constructor(private conversorService: ConversorService) { }

  ngOnInit() {
    this.getCurrencyList();
  }

  changeBase(): void {
    console.log('Selecting new Base');
  }

  getCurrencyList(): void {
    this.loader = true;
    this.conversorService.getCurrencyList().subscribe(data => {
      this.loader = false;
      this.currrencyList = data.rates;
      this.base = data.base;
    });
  }
}
