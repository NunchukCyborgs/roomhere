import { Component, Input } from '@angular/core';
import { Property } from '../property';
import { BASE_API_URL } from '../../config';

@Component({
  selector: 'property-preview',
  styles: [require('./styles.scss').toString()],
  template: require('./template.html').toString()
})
export class PropertyPreview {
  @Input() property: Property;
  public BASE_API_URL: string = BASE_API_URL;
}
