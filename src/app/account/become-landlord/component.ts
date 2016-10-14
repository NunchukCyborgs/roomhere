import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'become-landlord',
  styles:[require('./styles.scss').toString()],
  template: require('./template.html').toString(),
})
export class BecomeLandlord {
  constructor(private router: Router) { }
  public redirectUser() {
    this.router.navigate(['/account/dashboard']);
  }
  // Should add an auth guard on this route to redirect to /landlord-settings if they are already a landlord
}
