import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

@Component({
  selector: 'number-ticker',
  styleUrls: ['./styles.css'],
  templateUrl: 'template.html',
})
export class NumberTicker {
  @Input() min: number;
  @Input() max: number;
  @Input() number: number;
  @Output() numberChange: EventEmitter<any> = new EventEmitter();

  private incrementer: Observer<number>;

  ngOnInit() {
    new Observable(observer => this.incrementer = observer)
      .throttleTime(100)
      .do(x => this.number = Math.min(Math.max(Number(this.number) + Number(x), this.min), this.max))
      .do(() => this.numberChange.emit(this.number))
      .subscribe();
  }

  public increment(event, x: number) {
    event.stopPropagation();
    this.incrementer.next(x);
  }
}
