import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { isBrowser } from 'angular2-universal';
import { Property } from '../../../shared/dtos/property';

@Component({
  selector: 'pay-rent-modal',
  styleUrls: ['./styles.css'],
  templateUrl: 'template.html',
})
export class PayRentModal {
  public property: Property;

  constructor(private router: Router) { }

  public updateProperty(property: Property) {
    this.property = property;
  }

  public save() {
    if (this.property) {
      isBrowser && $('modal .close-button').click();
      this.router.navigate([`/pay-rent/${this.property.slug}`]);
    }
  }
}
