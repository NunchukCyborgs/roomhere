import { Component, Input } from '@angular/core';
import { Property, Review } from '../property';

@Component({
  selector: 'property-reviews',
  styles: [require('./styles.scss').toString()],
  template: require('./template.html').toString(),
})
export class PropertyReviews {
  @Input() property: Property;

  public review: Review = new Review();

}
