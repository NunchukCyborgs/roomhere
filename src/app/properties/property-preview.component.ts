import { Component, Input } from '@angular/core';
import { Property, PropertyService } from './index';
import { BASE_URL } from '../config';

@Component({
  moduleId: __filename,
  selector: 'property-preview',
  styles: [`
  .image-wrapper {
  width: 100%;
  height: 100%;
  border: 1px solid rgba(0, 0, 0, 0.04);
  overflow: hidden;
  position: relative;
  text-align: center;
  border-radius: 4px;
  margin-bottom: 50px;
}

.image-overlay-content {
  width: 100%;
  height: 100%;
  position: absolute;
  overflow: hidden;
  top: 0;
  left: 0;
  padding-bottom: 5px;
}

.overlay-fade-in p {
  letter-spacing: 0.15em;
  color: #f4f4f4;
  font-size: 28px;
  font-family: 'Neuton';
  opacity: 0;
  transition: all 0.2s linear;
}

.overlay-fade-in img {
  transition: all 0.2s linear;
}

.overlay-fade-in .image-overlay-content {
  opacity: 0;
  background-color: rgba(0, 0, 0, 0.4);
  transition: all 0.4s ease-in-out;
}

.overlay-fade-in h2 {
  color: #f2f2f2;
  font-size: 1.8rem;
  margin-top: 20%;
  opacity: 0;
  transition: all 0.2s ease-in-out;
  background: rgba(0, 0, 0, 0.7);
}

.overlay-fade-in .button {
  font-family: "Neuton" !important;
  display: inline-block;
  text-decoration: none;
  padding: 7px 14px;
  margin-bottom: 5px;
  text-transform: uppercase;
  box-shadow: 0 0 1px #000;
  border: 1px solid #999;
  opacity: 0;
  transition: all 0.2s ease-in-out;
}

.overlay-fade-in .button:hover {
  box-shadow: 0 0 5px #000;
}

.overlay-fade-in:hover img {
  transform: scale(1.2);
}

.overlay-fade-in:hover .image-overlay-content {
  opacity: 1;
}

.overlay-fade-in:hover h2, .overlay-fade-in p, .overlay-fade-in .button {
  opacity: 1;
}

.overlay-fade-in:hover p {
  transition-delay: 0.1s;
}

.overlay-fade-in:hover .button {
  transition-delay: 0.2s;
}

.overlay-fade-in-new-background .button {
  display: inline-block;
  text-decoration: none;
  padding: 7px 14px;
  background: #000;
  color: #fff;
  text-transform: uppercase;
  border-radius: 5px;
  box-shadow: 0 0 1px #000;
  position: relative;
  opacity: 0;
  transition: all 0.2s ease-in-out;
}

.overlay-fade-in-new-background .button:hover {
  box-shadow: 0 0 5px #fff;
  background-color: #222;
}

.overlay-fade-in-new-background p {
  font-size: 28px;
}

.overlay-fade-in-new-background h2 {
  color: #000;
  font-size: 1.6rem;
  margin-top: 30%;
  opacity: 0;
  transition: all 0.2s ease-in-out;
}

.overlay-fade-in-new-background p {
  opacity: 0;
  transition: all 0.2s linear;
}

.overlay-fade-in-new-background img {
  transition: all 0.2s ease-in-out;
}

.overlay-fade-in-new-background:hover img {
  filter: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg'><filter id='grayscale'><feColorMatrix type='matrix' values='0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0'/></filter></svg>#grayscale");
  filter: gray;
  -webkit-filter: grayscale(100%);
  transform: scale(1.5);
}

.overlay-fade-in-new-background:hover .image-overlay-content {
  opacity: 1;
}

.overlay-fade-in-new-background:hover h2, .overlay-fade-in-new-background p, .overlay-fade-in-new-background .button {
  opacity: 1;
}

.overlay-fade-in-new-background:hover p {
  transition-delay: 0.1s;
}

.overlay-fade-in-new-background:hover .button {
  transition-delay: 0.2s;
}

.price {
  font-family: 'Neuton';
  font-weight: 700;
  font-size: 1.2rem;
}

  `],
  template: `
      <div class="large-6 columns">
        <div class="image-wrapper overlay-fade-in">
          <a href="#"></a><img class="js-property-image" [src]="BASE_URL + property?.images[0].url" alt="Give me an alt">
            <div class="image-overlay-content">
                <h2 class="js-description">{{property.bedrooms}} Bedroom {{property.bathrooms}} Bath</h2>
                <p class="js-price price">{{property.price}}</p><a class="js-property-link button large" target="_blank" [href]="'/properties/' + property.slug">View Now</a>
            </div>
          <h5 class="js-address-line-1">{{property.address1}}</h5>
          <h5 class="js-address-line-2" *ngIf="property.address2">{{property.address2}}</h5>
        </div>
      </div>
  `
})
export class PropertyPreview {
  @Input() property: Property;
  public BASE_URL: string = BASE_URL;
}