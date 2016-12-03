import { Component, Input } from '@angular/core';
import { isBrowser } from 'angular2-universal';

@Component({
  selector: 'pay-rent-ad',
  styleUrls: ['./styles.css'],
  templateUrl: 'template.html'
})
export class PayRentAd {
  @Input() hasAuth: boolean;
  public signup(): void {
    if (isBrowser && !this.hasAuth) {
      $('#SignupLink').click();
    }
  }
}
