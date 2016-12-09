import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Property } from '../../shared/dtos/property';

@Component({
  selector: 'pay-rent-address',
  styleUrls: ['./styles.css'],
  templateUrl: 'template.html',
})
export class PayRentAddress {
  public property: Property;

  constructor(private router: Router) { }

  public updateProperty(property: Property) {
    this.property = property;
  }

  public save() {
    if (this.property) {
      this.router.navigate([`/pay-rent/${this.property.slug}`]);
    }
  }
}
