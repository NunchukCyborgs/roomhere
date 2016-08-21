import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { PropertyService, Property, PropertyFacet } from '../properties/property.service';
import { PropertyPreview } from '../properties/property-preview.component';
import { PropertyMap } from './property-map.component';
import { PropertyFilters } from './property-filters.component';
import { PropertySlider } from './property-slider.component';

declare let $: any;

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
  constructor(private propertyService: PropertyService) { ; }

  ngOnInit() {
    this.applyFacet(this.facet);
  }

  public applyFacet(facet: PropertyFacet) {
    this.properties$ = this.propertyService.getFilteredProperties$(this.facet);
  }
}
