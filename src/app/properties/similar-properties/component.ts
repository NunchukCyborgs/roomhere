import { Component, Input } from '@angular/core';
import { PropertyService, Property } from '../index';

;

@Component({
//  moduleId: __filename,
  selector: 'similar-properties',
  // styles: [require('./styles.scss').toString()],
  templateUrl: 'template.html',
})
export class SimilarProperties {
  @Input() property: Property;
}
