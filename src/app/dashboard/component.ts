import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { PropertyService, Property } from '../properties/index';

@Component({
  selector: 'dashboard',
  styles: [require('./styles.scss').toString()],
  templateUrl: 'template.html'
})
export class Dashboard {
  public properties$: Observable<Property[]>;

  constructor(private propertyService: PropertyService) {

  }

  public updateProperty(property: Property) {
    console.log('need to update this here property', property);
  }

  ngOnInit() {
    this.properties$ = this.propertyService
      .getMyProperties$();
  }
}
