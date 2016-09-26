import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Property, PropertyFacet } from '../properties/property';
import { PropertyService } from '../properties/property.service';
import { MapOptions } from '../components/property-map/component';
import { User } from '../users/user';
import { UserService } from '../users/user.service';
import { CAPE_GIRARDEU_CENTER } from '../config';

const MAP_HEIGHT = '100%';
const MAP_ZOOM_LEVEL = 13;

@Component({
  selector: 'welcome',
  styles: [require('./styles.scss').toString()],
  template: require('./template.html').toString()
})
export class Welcome {
  public properties$: Observable<Property[]>;
  public facet: PropertyFacet = new PropertyFacet();
  public pageNumber: number = 1;
  public lastPage$: Observable<number>;
  public mapOptions: MapOptions;
  public showFilters: boolean = false;
  public loadFilteredProperties$: BehaviorSubject<PropertyFacet>;

  constructor(private propertyService: PropertyService, private userService: UserService) { }

  ngOnInit() {
    this.loadFilteredProperties$ = new BehaviorSubject(this.facet);
  }

  ngAfterViewInit() {
    this.properties$ = this.loadFilteredProperties$
      .map(i => JSON.stringify(i))
      .distinct()
      .flatMap(() => this.propertyService.getFilteredProperties$(this.facet, this.pageNumber));

    this.applyFacet();
    this.lastPage$ = this.propertyService.lastPage$;
    this.updateMapOptions();
  }

  public applyFacet() {
    this.loadFilteredProperties$.next(this.facet);
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
