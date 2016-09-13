import { Component, Input } from '@angular/core';
import { PropertyService, Property } from '../index';

declare let require: (string) => string;

@Component({
//  moduleId: __filename,
  selector: 'property-reviews',
  // styles: [require('./styles.scss').toString()],
  templateUrl: 'template.html',
})
export class PropertyReviews {
  @Input() property: Property;
}
