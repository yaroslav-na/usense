import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { finalize } from 'rxjs';

import { Currencies, CurrencyService } from '../currency.service';

@Component({
  selector: 'app-converter',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './converter.component.html',
  styleUrl: './converter.component.scss',
})
export class ConverterComponent {
  private errors = {
    api: 'Could not get currrencies',
    input1: 'The value of the first input is incorrect',
    input2: 'The value of the second input is incorrect',
  };
  protected isLoading = false;
  protected error: null | string = null;
  protected currencies: Currencies[] = [];
  protected currencyPrice = 0;
  protected select1!: Currencies;
  protected select2!: Currencies;
  protected input1 = '';
  protected input2 = '';

  constructor(private currencyService: CurrencyService) {
    this.currencies = currencyService.currencies;
    [this.select1, this.select2] = this.currencies;
  }

  ngOnInit() {
    this.onSelectChange();
  }

  protected onSelectChange() {
    this.error = null;
    this.isLoading = true;

    this.currencyService
      .getCurrency(this.select1)
      .pipe(
        finalize(() => {
          this.isLoading = false;
        }),
      )
      .subscribe({
        next: value => {
          this.currencyPrice = value.rates[this.select2];

          this.handleInput1Change();
        },
        error: err => {
          console.log(err);

          this.error = this.errors.api;
        },
      });
  }

  protected handleInput1Change() {
    const isError = isNaN(+this.input1);
    const value = +this.input1 * this.currencyPrice;

    this.error = isError ? this.errors.input1 : null;
    this.input2 = isError || !this.input1 ? '' : value.toFixed(2);
  }

  protected handleInput2Change() {
    const isError = isNaN(+this.input2);
    const value = +this.input2 / this.currencyPrice;

    this.error = isError ? this.errors.input1 : null;
    this.input1 = isError || !this.input2 ? '' : value.toFixed(2);
  }
}
