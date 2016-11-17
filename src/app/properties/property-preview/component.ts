import { Component, Input } from '@angular/core';
import { isBrowser } from 'angular2-universal';
import { Observable } from 'rxjs/Observable';
import { Property } from '../../shared/dtos/property';
import { DEFAULT_TENANT } from '../../config';

@Component({
  selector: 'property-preview',
  styles: [require('./styles.scss').toString()],
  templateUrl: 'template.html'
})
export class PropertyPreview {
  @Input() property: Property;
  public BASE_API_URL: string = BASE_API_URL;
  public target: string;

  public get propertyUrl(): string {
    return `/${DEFAULT_TENANT}/${this.property.slug}`
  }

  ngOnInit() {
    if (isBrowser) {
      const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
      this.target = width > 780 ? '_blank' : null;
    }
  }
}
