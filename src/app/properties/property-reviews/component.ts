import { Component, Input } from '@angular/core';
import { PropertyService, Property } from '../index';

@Component({
  selector: 'property-reviews',
  styles: [require('./styles.scss').toString()],
  template: require('./template.html').toString(),
})
export class PropertyReviews {
  @Input() property: Property;
}
