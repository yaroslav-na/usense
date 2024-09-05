import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CurrencyService, Currencies, Response } from '../currency.service';

type CurrenciesObj = {
  [key in Currencies]?: number;
};

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  protected currencies: CurrenciesObj = {};
  protected date: string = '';

  constructor(private currencyService: CurrencyService) {}

  ngOnInit(): void {
    for (const currency of this.currencyService.currencies) {
      this.currencyService.getCurrency(currency).subscribe(data => {
        this.setCurrency(data, currency);
        this.date = data.date;
      });
    }
  }

  private setCurrency(data: Response, currency: Currencies) {
    this.currencies[currency] = data.rates.UAH;
  }
}
