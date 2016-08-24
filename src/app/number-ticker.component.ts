import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'number-ticker',
    styles: [`
      input[type="number"]::-webkit-outer-spin-button,
      input[type="number"]::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
      }
      input[type="number"] {
          -moz-appearance: textfield;
      }

      .icon-minus, .icon-plus {
        font-size: .8em;
      }

      input {
        width: 35px;
        display: inline;
        border: none;
        box-shadow: none;
        background: #f5f5f5;
        margin-bottom: 0;
        text-align: center;
      }

      .number-ticker {
        display: inline-block;
        border: 2px solid #EEE;
      }

      .number-ticker__wrapper {
        display: block
      }

      button:focus, input:focus {
        outline: none;
      }

      button {
        padding: 1px 3px 2px;
        border: 1px solid #666;
        border-radius: 100%;
      }
    `],
    template: `
    <div class="number-ticker__wrapper">
      <div class="number-ticker">
        <button type="button" (click)="increment(-1)"><i class="icon-minus"></i></button>
        <input type="number" [min]="min" [max]="max" [value]="number" pattern="[0-9]*" inputmode="numeric"
        (change)="number = $event.target.value; increment(0)" />
        <button type="button" (click)="increment(1)"><i class="icon-plus"></i></button>
      </div>
    </div>
  `
})
export class NumberTicker {
  @Input() min: number;
  @Input() max: number;
  @Input() number: number;
  @Output() numberChange: EventEmitter<any> = new EventEmitter();

  public increment(x: number) {
    this.number = Math.min(Math.max(Number(this.number) + Number(x), this.min), this.max);
    this.numberChange.emit(this.number);
  }
}
