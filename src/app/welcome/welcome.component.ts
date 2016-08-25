import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { PropertyService, Property, PropertyFacet, PropertyPreview, PropertyMap, MapOptions } from '../properties/index';
import { PropertyFilters } from './property-filters.component';
import { PropertySlider } from './property-slider.component';
import { CAPE_GIRARDEU_CENTER } from '../config';

declare let $: any;
const MAP_HEIGHT = '100vh';
const MAP_ZOOM_LEVEL = 13;

@Component({
  moduleId: __filename,
  selector: 'welcome',
  directives: [PropertyPreview, PropertyMap, PropertyFilters, PropertySlider],
  styles: [`
   #scrolldiv{
          overflow: scroll;
          overflow-x: hidden;
          height: 100vh;
          border-top:solid 1px grey;
          max-width: none !important;
        }
    .left-margin-fix{
        margin-left:auto !important;
    }
    #one{
        overflow: hidden;
        position: relative;
    }
    #map{
        height: 100vh;
    }
    body{
        margin: 0px;
        height: 100%;
    }
    .rental{
        margin-bottom: 50px;
    }
    .fieldmargbtm{
        margin-bottom: 10px;
    }
    .marg40top{
        margin-top: 40px;
    }
    
//Product_Divs
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

.image-overlay-content_visible {
  width: 100%;
  height: 100%;
  position: absolute;
  padding-bottom: 5px;
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
  transition: all 0.2s linear; }
.overlay-fade-in img {
  transition: all 0.2s linear; }
.overlay-fade-in .image-overlay-content {
  opacity: 0;
  background-color: rgba(0, 0, 0, 0.4);
  transition: all 0.4s ease-in-out; }
.overlay-fade-in h2 {
  color: #f2f2f2;
  font-size: 1.8rem;
  margin-top: 20%;
  opacity: 0;
  transition: all 0.2s ease-in-out;
  background: rgba(0, 0, 0, 0.7); }
.overlay-fade-in .button {
  font-family: 'Neuton'!important;
  display: inline-block;
  text-decoration: none;
  padding: 7px 14px;
  margin-bottom: 5px;
  text-transform: uppercase;
  box-shadow: 0 0 1px #000;
  border: 1px solid #999;
  opacity: 0;
  transition: all 0.2s ease-in-out; }
.overlay-fade-in .button:hover {
    box-shadow: 0 0 5px #000; }
.overlay-fade-in:hover img {
  transform: scale(1.2); }
.overlay-fade-in:hover .image-overlay-content {
  opacity: 1; }
.overlay-fade-in:hover h2, .overlay-fade-in p, .overlay-fade-in .button {
  opacity: 1; }
.overlay-fade-in:hover p {
  transition-delay: 0.1s; }
.overlay-fade-in:hover .button {
  transition-delay: 0.2s; }

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
  transition: all 0.2s ease-in-out; }
  .overlay-fade-in-new-background .button:hover {
    box-shadow: 0 0 5px #fff;
    background-color: #222; }
.overlay-fade-in-new-background p {
  font-size: 28px;
  }
.overlay-fade-in-new-background h2 {
  color: #000;
  font-size: 1.6rem;
  margin-top: 30%;
  opacity: 0;
  transition: all 0.2s ease-in-out; }
.overlay-fade-in-new-background p {
  opacity: 0;
  transition: all 0.2s linear; }
.overlay-fade-in-new-background img {
  transition: all 0.2s ease-in-out; }
.overlay-fade-in-new-background:hover img {
  filter: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg'><filter id='grayscale'><feColorMatrix type='matrix' values='0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0'/></filter></svg>#grayscale");
  filter: gray;
  -webkit-filter: grayscale(100%);
  transform: scale(1.5); }
.overlay-fade-in-new-background:hover .image-overlay-content {
  opacity: 1; }
.overlay-fade-in-new-background:hover h2, .overlay-fade-in-new-background p, .overlay-fade-in-new-background .button {
  opacity: 1; }
.overlay-fade-in-new-background:hover p {
  transition-delay: 0.1s; }
.overlay-fade-in-new-background:hover .button {
  transition-delay: 0.2s; }
.price{
    font-family: 'Neuton';
    font-weight: 700;
    font-size: 1.2rem;
}
//End of Product Div Css
.pag{
    margin-bottom: 100px;
}

p {
  color: #888;
  font-size: 13px;
  margin-bottom: 0;
}

@media screen and (max-width: 39.9375em) {
    .left-margin-fix{
        margin-left:auto !important;
        margin-right:auto !important;
    }
}


  `],
  templateUrl: 'welcome.component.html'
})
export class Welcome implements OnInit {
  public properties$: Observable<Property[]>;
  public facet: PropertyFacet = new PropertyFacet();
  public mapOptions: MapOptions;

  constructor(private propertyService: PropertyService) { }

  ngOnInit() {
    this.applyFacet(this.facet);
  }

  public applyFacet(facet: PropertyFacet) {
    this.properties$ = this.propertyService
      .getFilteredProperties$(this.facet)
      .do((properties: Property[]) => this.updateMapOptions(properties));
  }

  private updateMapOptions(properties: Property[]) {
    this.mapOptions = {
      height: MAP_HEIGHT,
      center: CAPE_GIRARDEU_CENTER,
      zoomLevel: MAP_ZOOM_LEVEL
    }
  }
}