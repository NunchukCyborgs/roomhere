import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { PropertyService, Property, PropertyFacet, PropertyPreview, PropertyMap, MapOptions } from '../properties/index';
import { PropertyFilters } from './property-filters.component';
import { PropertySlider } from './property-slider.component';
import { CAPE_GIRARDEU_CENTER } from '../config';

declare let $: any;
const MAP_HEIGHT = '100VA';
const MAP_ZOOM_LEVEL = 13;

@Component({
  moduleId: __filename,
  selector: 'welcome',
  directives: [PropertyPreview, PropertyMap, PropertyFilters, PropertySlider],
  styles: [`
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
      height: '100vh',
      center: CAPE_GIRARDEU_CENTER,
      zoomLevel: MAP_ZOOM_LEVEL
    }
  }
}
