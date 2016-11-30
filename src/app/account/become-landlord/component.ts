import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'become-landlord',
  styleUrls: [],
  templateUrl: 'template.html',
})
export class BecomeLandlord {
  @Input() isLandlord: boolean;
  constructor(private router: Router) { }
  public redirectUser() {
    this.router.navigate(['/account/dashboard']);
  }
  // Should add an auth guard on this route to redirect to /landlord-settings if they are already a landlord
}
