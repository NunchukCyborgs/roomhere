import { Component } from '@angular/core';
import { Property } from '../../../shared/dtos/property';

@Component({
  selector: 'pay-rent-address',
  styleUrls: ['./styles.css'],
  templateUrl: 'template.html',
})
export class PayRentAddress {
  constructor() { }

  save(property: Property) {
    console.log('we picked this property: ', property);

    // navigate or something
  }
}
