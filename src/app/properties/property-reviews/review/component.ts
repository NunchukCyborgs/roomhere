import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Review } from '../../../shared/dtos/property';

@Component({
  selector: 'property-review',
  styles: [require('./styles.scss').toString()],
  template: require('./template.html').toString(),
})
export class PropertyReview {
  @Input() review: Review;
}
