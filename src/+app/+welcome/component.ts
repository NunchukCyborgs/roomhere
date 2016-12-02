import { Component, OnInit, Renderer } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Property } from '../shared/dtos/property';
import { PropertyFacet } from '../shared/dtos/facets';
import { PropertyService } from '../shared/services/property.service';
import { FacetsService } from '../shared/services/facets.service';
import { PropertySeoService } from '../shared/services/property-seo.service';
import { PersistenceService } from '../shared/services/persistence.service';
import { MapOptions } from '../+property/property-map/component';
import { User } from '../shared/dtos/user';
import { UserService } from '../shared/services/user.service';

const MAP_HEIGHT = '100%';
const MAP_ZOOM_LEVEL = 13;

@Component({
  selector: 'welcome',
  styleUrls: ['./styles.css'],
  templateUrl: 'template.html'
})
export class Welcome {
  public properties$: BehaviorSubject<Property[]> = new BehaviorSubject([]);
  public facet: PropertyFacet = new PropertyFacet();
  public pageNumber: number = 1;
  public query: string = '';
  public lastPage$: Observable<number>;
  public mapOptions: MapOptions;
  public showFilters: boolean = false;
  public loadFilteredProperties$: BehaviorSubject<PropertyFacet>;
  public showSignupAd$: Observable<boolean>;

  constructor(private propertyService: PropertyService, private userService: UserService, private persist: PersistenceService,
    private route: ActivatedRoute, private router: Router, private propertySeoService: PropertySeoService, private renderer: Renderer,
    private facetsService: FacetsService) { }

  ngOnInit() {
    this.loadFilteredProperties$ = new BehaviorSubject(this.facet);
    this.showSignupAd$ = this.userService.hasAuth$
      .filter(i => !i)
      .map(() => !this.persist.get('no_signup_ad'));

    let query = this.route.params['q'] || '';

    this.loadFilteredProperties$
      .debounceTime(500)
      .flatMap(() => this.facetsService.loadFacets())
      .flatMap(() => this.facetsService.minPrice$)
      .do(i => this.facet.min_price = this.facet.min_price < i ? i : this.facet.min_price)
      .flatMap(() => this.facetsService.maxPrice$)
      .do(i => this.facet.max_price = this.facet.max_price > i ? i : this.facet.max_price)
      .flatMap(() => this.propertyService.getFilteredProperties$(this.facet, this.query, this.pageNumber))
      .do(i => this.propertySeoService.addProperties(this.renderer, i))
      .subscribe(i => this.properties$.next(i));

    this.lastPage$ = this.propertyService.lastPage$;
  }

  ngAfterViewInit() {
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
      center: <any>CAPE_GIRARDEU_CENTER,
      zoomLevel: MAP_ZOOM_LEVEL
    };
  }
}
