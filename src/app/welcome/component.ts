import { Component, OnInit, Renderer } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Property } from '../shared/dtos/property';
import { PropertyFacet } from '../shared/dtos/facets';
import { PropertyService } from '../shared/services/property.service';
import { PropertySeoService } from '../shared/services/property-seo.service';
import { PersistenceService } from '../shared/services/persistence.service';
import { MapOptions } from '../shared/components/property-map/component';
import { User } from '../shared/dtos/user';
import { UserService } from '../shared/services/user.service';
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
  public query: string;
  public mapOptions: MapOptions;
  public showFilters: boolean = false;
  public loadFilteredProperties$: BehaviorSubject<PropertyFacet>;
  public showSignupAd$: Observable<boolean>;
  public hasAuth$: Observable<boolean> = this.userService.hasAuth$;

  constructor(private propertyService: PropertyService, private userService: UserService, private persist: PersistenceService,
    private route: ActivatedRoute, private router: Router, private propertySeoService: PropertySeoService, private renderer: Renderer) { }

  ngOnInit() {
    this.loadFilteredProperties$ = new BehaviorSubject(this.facet);
    this.showSignupAd$ = this.userService.hasAuth$
      .filter(i => !i)
      .map(() => !this.persist.get('no_signup_ad'));
  }

  ngAfterViewInit() {
    let filteredProperties$: BehaviorSubject<Property[]>;

    this.route.data.forEach((d: { properties: { properties: Property[], query: string } }) => {
      filteredProperties$ = filteredProperties$ || new BehaviorSubject(d.properties.properties);
      this.query = d.properties.query;
      this.facet = new PropertyFacet();
      this.applyFacet(this.facet);
    });

    this.properties$ = filteredProperties$;

    this.loadFilteredProperties$
      .map(i => JSON.stringify(i) + this.pageNumber + this.query)
      .distinctUntilChanged()
      .flatMap(() => this.propertyService.getFilteredProperties$(this.facet, this.query, this.pageNumber, this.pageNumber === 1 ? 3 : 4, this.pageNumber === 1 ? 0 : 1)) // hey
      .do(i => this.propertySeoService.addProperties(this.renderer, i))
      .subscribe(i => filteredProperties$.next(i));

    this.applyFacet(this.facet);
    this.lastPage$ = this.propertyService.lastPage$;
    this.updateMapOptions();
  }

  public applyFacet(facet?: PropertyFacet) {
    this.facet = facet ? facet : this.facet;
    this.loadFilteredProperties$.next(this.facet);
  }

  public removeSignupAd() {
    this.persist.set('no_signup_ad', new Date().getTime().toString());
    this.showSignupAd$ = Observable.of(false);
  }

  private updateMapOptions() {
    this.mapOptions = {
      interactive: true,
      height: MAP_HEIGHT,
      center: CAPE_GIRARDEU_CENTER,
      zoomLevel: MAP_ZOOM_LEVEL
    };
  }
}
