import { Component, Input } from '@angular/core';
import { Property, PropertyService } from '../index';
import { BASE_API_URL } from '../../config';

@Component({
  selector: 'property-preview',
  styles: [require('./styles.scss').toString()],
  templateUrl: 'template.html'
})
export class PropertyPreview {
  @Input() property: Property;
  public BASE_API_URL: string = BASE_API_URL;
}
