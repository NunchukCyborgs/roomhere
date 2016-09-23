import { Component, Input } from '@angular/core';
import { PropertyService, Property } from '../index';

@Component({
  selector: 'similar-properties',
  styles: [require('./styles.scss').toString()],
  template: require('./template.html').toString(),
})
export class SimilarProperties {
  @Input() property: Property;
}
