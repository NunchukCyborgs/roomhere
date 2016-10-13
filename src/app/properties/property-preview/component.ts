import { Component, Input } from '@angular/core';
import { Property } from '../property';
import { DEFAULT_TENANT } from '../../config';

@Component({
  selector: 'property-preview',
  styles: [require('./styles.scss').toString()],
  template: require('./template.html').toString()
})
export class PropertyPreview {
  @Input() property: Property;
  public BASE_API_URL: string = BASE_API_URL;

  public get propertyUrl(): string {
    return `/${DEFAULT_TENANT}/${this.property.slug}`
  }
}
