import { Component, Input } from '@angular/core';
import { PropertyService, Property } from '../index';

declare let require: (string) => string;

@Component({
//  moduleId: __filename,
  selector: 'similar-properties',
  // styles: [require('./styles.scss').toString()],
  templateUrl: 'template.html',
})
export class SimilarProperties {
  @Input() property: Property;
}
