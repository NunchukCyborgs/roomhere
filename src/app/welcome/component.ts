import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { PropertyService, Property, PropertyFacet } from '../properties/index';
import { MapOptions } from '../components/property-map/component';
import { UserService, User } from '../users/index';
import { CAPE_GIRARDEU_CENTER } from '../config';

const MAP_HEIGHT = '100%';
const MAP_ZOOM_LEVEL = 13;

@Component({
  selector: 'welcome',
  styles: [require('./styles.scss').toString()],
  templateUrl: 'template.html'
})
export class Welcome {
  public properties$: Observable<Property[]>;
  public facet: PropertyFacet = new PropertyFacet();
  public pageNumber: number = 1;
  public lastPage$: Observable<number>;
  public mapOptions: MapOptions;
  public showFilters: boolean = false;

  constructor(private propertyService: PropertyService, private userService: UserService) { }

  ngAfterViewInit() {
    this.applyFacet();
    this.lastPage$ = this.propertyService.lastPage$;
    this.updateMapOptions();
  }

  public applyFacet() {
    this.properties$ = this.propertyService
      .getFilteredProperties$(this.facet, this.pageNumber);
  }

  private updateMapOptions() {
    this.mapOptions = {
      interactive: true,
      height: MAP_HEIGHT,
      center: CAPE_GIRARDEU_CENTER,
      zoomLevel: MAP_ZOOM_LEVEL
    }
  }
}
