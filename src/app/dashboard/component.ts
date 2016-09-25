import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Property } from '../properties/property';
import { PropertyService } from '../properties/property.service';

@Component({
  selector: 'dashboard',
  styles: [require('./styles.scss').toString()],
  template: require('./template.html').toString()
})
export class Dashboard {
  public properties$: Observable<Property[]>;

  constructor(private propertyService: PropertyService) {

  }

  public updateProperty(property: Property) {
    this.propertyService.update(property).subscribe();
  }

  ngOnInit() {
    this.properties$ = this.propertyService
      .getMyProperties$();
  }
}