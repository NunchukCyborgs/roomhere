import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { isBrowser } from 'angular2-universal';
import { Property } from '../../../shared/dtos/property';
import { jQueryService } from '../../../shared/services/jquery.service';

@Component({
  selector: 'pay-rent-modal',
  styleUrls: ['./styles.css'],
  templateUrl: 'template.html',
})
export class PayRentModal {
  public property: Property;

  constructor(private router: Router, private jquery: jQueryService) { }

  public updateProperty(property: Property) {
    this.property = property;
  }

  public save() {
    this.jquery.loadJQuery()
      .filter(() => Boolean(this.property))
      .do(jquery => jquery('modal .close-button').click())
      .do(() => this.router.navigate([`/pay-rent/${this.property.slug}`]));
  }
}
