import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { isBrowser } from 'angular2-universal';

@Component({
  selector: 'top-bar',
  styles: [require('./styles.scss').toString()],
  template: require('./template.html').toString()
})
export class TopBar {
  @Input() hasAuth: boolean;
  @Input() isLandlord: boolean;
  @Output() logout: EventEmitter<any> = new EventEmitter();

  constructor(private router: Router) { }

  public closeMenu() {
    console.log('closing menu')
    isBrowser && $('.title-bar button[data-toggle]').click();
  }
}
