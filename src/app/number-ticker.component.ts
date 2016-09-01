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
        font-size: .8rem;
        padding: 2px;
      }
      .icon-plus:hover {
        color: #DAA520;
      }
      .icon-minus:hover{
         color: #DAA520;
      } 
      input {
        display: inline;
        border: none;
        box-shadow: none;
        background: #f5f5f5;
        margin-bottom: 0px;
        text-align: center;
        font-size:1.5rem;
        font-weight:500;
      }
      .number-ticker {
        border: 2px solid #EEE;
      }
      button:focus, input:focus {
        outline: none;
      }

      button {
            transform: translateY(50%);
      }
      .purp{
        background: #44254a;
        color:#fff;
    }
     .purp:hover{
        background: #391940;
        color:#fff;
    }
    @media (max-width: 480px) {
    
    .number-ticker{
            border: 1px solid #EEE !important;
            /* Make sure this works */
}
    }
    `],
    template: `
    <div class="row collapse purp number-ticker">
      <div class="small-2 text-center columns">
        <button type="button" (click)="increment(-1)"><i class="icon-minus"></i></button>
      </div>
      <div class="small-8 text-center columns">
        <input type="number" [min]="min" [max]="max" [value]="number" pattern="[0-9]*" inputmode="numeric"
        (change)="number = $event.target.value; increment(0)" />
      </div>
      <div class="small-2 text-center columns">
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
