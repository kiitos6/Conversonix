import { Currency } from "./currency";
import { QueryDataConversion } from "./queryDataConversion";
import { InfoCurrencyResponse } from "./infoCurrecyResponse";

export interface ConversionResponse {
  success: boolean;
  query: QueryDataConversion;
  info: InfoCurrencyResponse;
  historical: any;
  date: Date;
  result: number;
}