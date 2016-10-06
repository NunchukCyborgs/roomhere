import { Component, Input } from '@angular/core';
import { Property } from '../property';
import { BASE_API_URL, DEFAULT_TENENT } from '../../config';

@Component({
  selector: 'property-preview',
  styles: [require('./styles.scss').toString()],
  template: require('./template.html').toString()
})
export class PropertyPreview {
  @Input() property: Property;
  public BASE_API_URL: string = BASE_API_URL;

  public get propertyUrl(): string {
    return `/${DEFAULT_TENENT}/${this.property.slug}`
  }
}
