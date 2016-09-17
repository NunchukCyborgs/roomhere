import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { PropertyService, Property } from '../properties/index';

@Component({
  selector: 'dashboard',
  styles: [require('./styles.scss').toString()],
  templateUrl: 'template.html'
})
export class Dashboard  {
  public properties$: Observable<any[]>;

  constructor(private propertyService: PropertyService) {

  }

  public updateProperty(property: Property) {
    console.log('need to update this here property', property);
  }

  ngOnInit() {
    // this.properties$ = this.propertyService.getMyProperties$();
    this.properties$ = Observable.of([
      Object.assign(new Property(), {id: 1, address1: '123 clover'}),
      Object.assign(new Property(), {id: 2, address1: '234 clover'}),
      Object.assign(new Property(), {id: 3, address1: '3456 clover'}),
      Object.assign(new Property(), {id: 4, address1: '5678 clover'}),
      Object.assign(new Property(), {id: 5, address1: '678 clover'}),
    ]);
  }
}
