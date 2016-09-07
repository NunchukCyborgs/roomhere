import { Component, Input, Output, EventEmitter } from '@angular/core';

declare let require: (string) => string;

@Component({
    selector: 'number-ticker',
  styles: [require('./styles.scss').toString()],
  templateUrl: 'template.html',
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