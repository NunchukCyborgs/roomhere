import { Component, Input, Output, EventEmitter } from '@angular/core';
import { isBrowser } from 'angular2-universal';

@Component({
  selector: 'top-bar',
  styles: [require('./styles.scss').toString()],
  template: require('./template.html').toString()
})
export class TopBar {
  @Input() hasAuth: boolean;
  @Output() logout: EventEmitter<any> = new EventEmitter();
}
