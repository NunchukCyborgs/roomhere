import { Component, Input } from '@angular/core';
import { Property } from '../../shared/dtos/property';

@Component({
  selector: 'similar-properties',
  styles: [require('./styles.scss').toString()],
  template: require('./template.html').toString(),
})
export class SimilarProperties {
  @Input() property: Property;
}
