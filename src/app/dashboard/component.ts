import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { PropertyService, Property } from '../properties/index';

@Component({
  selector: 'dashboard',
  styles: [require('./styles.scss').toString()],
  templateUrl: 'template.html'
})
export class Dashboard  {
  public properties$: Observable<Property>;

  constructor(private propertyService: PropertyService) {

  }

  ngOnInit() {
    this.properties$ = this.propertyService.getMyProperties$();
  }
}
