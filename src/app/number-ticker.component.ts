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

      .fa {
        font-size: .5em;
      }

      input {
        width: 35px;
        display: inline;
        border: none;
        box-shadow: none;
        background: #f5f5f5;
        margin-bottom: 10px;
        text-align: center;
      }

      .number-ticker {
        border: 2px solid #EEE;
      }

      button:focus, input:focus {
        outline: none;
      }
    `],
    template: `
    <div class="number-ticker">
      <button type="button" (click)="increment(-1)"><i class="fa fa-minus"></i></button>
      <input type="number" [min]="min" [max]="max" [value]="number" pattern="[0-9]*" inputmode="numeric"
      (change)="number = $event.target.value; increment(0)" />
      <button type="button" (click)="increment(1)"><i class="fa fa-plus"></i></button>
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
