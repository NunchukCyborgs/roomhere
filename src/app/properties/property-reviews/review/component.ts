import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Review } from '../../../shared/dtos/property';

@Component({
  selector: 'property-review',
  styles: [require('./styles.scss').toString()],
  templateUrl: 'template.html',
})
export class PropertyReview {
  @Input() review: Review;
  @Output() edit: EventEmitter<any> = new EventEmitter();
}
