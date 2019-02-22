import { Currency } from './currency';

export interface LatestCurrenciesResponse {
  success: boolean;
  historical: boolean;
  date: Date;
  timestamp: Date;
  base: string;
  rates:Currency[];
}
