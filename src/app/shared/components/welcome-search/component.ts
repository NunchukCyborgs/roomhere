import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { isBrowser } from 'angular2-universal';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'welcome-search',
  styles: [require('./styles.scss').toString()],
  template: require('./template.html').toString()
})
export class WelcomeSearch {
  public query: string = 'hanover';
  constructor(private router: Router) { }

  search() {
    this.router.navigate(['/search', { query: this.query }]);
  }
}
