import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Property, Review } from '../../property';

@Component({
  selector: 'editable-review',
  styles: [require('./styles.scss').toString()],
  template: require('./template.html').toString(),
})
export class EditableReview {
  @Input() review: Review;
  @Output() save: EventEmitter<any> = new EventEmitter();
  @Output() cancel: EventEmitter<any> = new EventEmitter();
}
