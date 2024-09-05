import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export type Response = {
  base: string;
  date: string;
  rates: {
    UAH: number;
    USD: number;
    EUR: number;
  };
};

export type Currencies = keyof Response['rates'];

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  private readonly baseUrl = 'https://api.fxratesapi.com/';
  readonly currencies: Currencies[] = ['UAH', 'EUR', 'USD'];

  constructor(private http: HttpClient) {}

  getCurrency(currency: Currencies) {
    return this.http.get<Response>(
      `${this.baseUrl}latest?base=${currency}&currencies=UAH,USD,EUR`,
    );
  }
}
