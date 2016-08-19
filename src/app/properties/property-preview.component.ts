import { Component, Input } from '@angular/core';
import { Property } from './property';
import { PropertyService } from './property.service';

@Component({
  moduleId: __filename,
  selector: 'property-preview',
  styles: [`
  `],
  template: `
    <div class="columns">
      <div class="image-wrapper overlay-fade-in">
          <a href="#"></a><img class="js-property-image" [src]="property.image_url" alt="Give me an alt">
          <div class="image-overlay-content">
              <h2 class="js-description">{{property.bedroom}} Bedroom {{property.bathroom}} Bath</h2>
              <p class="js-price price">{{property.price}}</p><a class="js-property-link button large" target="_blank" href="/properties/318-north-middle-street-1">View Now</a>
          </div>
          <h5 class="js-address-line-1">{{property.address1}}</h5>
          <h5 class="js-address-line-2" *ngIf="property.address2">{{property.address2}}</h5>
        </div>
      </div>
  `
})
export class PropertyPreview {
  @Input() property: Property;
}
