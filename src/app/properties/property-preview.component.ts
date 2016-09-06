import { Component, Input } from '@angular/core';
import { Property, PropertyService } from './index';
import { BASE_API_URL } from '../config';

declare let require: (string) => string;

@Component({
  moduleId: __filename,
  selector: 'property-preview',
  styles: [require('./property-preview.component.scss').toString()],
  template: `
  <div class="image-wrapper overlay-fade-in">
    <a href="#"></a>
    <a target="_blank" [href]="'/properties/' + property.slug">
      <div class="chrome-wrap-fix">
        <div class="responsive-image">
          <img *ngIf="property?.images[0]?.url" class="property-image" [src]="BASE_API_URL + property.images[0].url">
        </div>
      </div>

      <div class="image-overlay-content">
          <h2 class="js-description">{{property.bedrooms}} Bedroom {{property.bathrooms}} Bath</h2>
          <p class="js-price price">{{ property.price | currency : "USD" : true : "1.0-0" }}</p><a class="js-property-link button large" >View Now</a>
      </div>
    <h5 class="js-address-line-1">{{property.address1}}</h5>
    <h5 class="js-address-line-2" *ngIf="property.address2">{{property.address2}}</h5>
    </a>
  </div>
  `
})
export class PropertyPreview {
  @Input() property: Property;
  public BASE_API_URL: string = BASE_API_URL;
}
