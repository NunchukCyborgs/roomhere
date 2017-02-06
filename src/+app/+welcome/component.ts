import { Component, OnInit, Renderer } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Property, Amenity } from '../shared/dtos/property';
import { PropertyFacet } from '../shared/dtos/facets';
import { PropertyService, PropertySearchParams } from '../shared/services/property.service';
import { FacetsService } from '../shared/services/facets.service';
import { PropertySeoService } from '../shared/services/property-seo.service';
import { PersistenceService } from '../shared/services/persistence.service';
import { MapOptions } from '../+property/property-map/component';
import { User } from '../shared/dtos/user';
import { UserService } from '../shared/services/user.service';
import { parseUrlRange, parseUrlList, createUrlParam, createUrlRangeParam, createUrlListParam } from '../shared/services/util';
import { flyInOut } from '../shared/services/animations';

const MAP_HEIGHT = '100%';
const MAP_ZOOM_LEVEL = 13;

@Component({
  selector: 'welcome',
  styleUrls: ['./styles.css'],
  templateUrl: 'template.html',
  animations: [
    flyInOut
  ],
})
export class Welcome {
  public properties$: BehaviorSubject<Property[]> = new BehaviorSubject([]);
  public facet: PropertyFacet;
  public pageNumber: number = 1;
  public query: string = '';
  public lastPage$: Observable<number>;
  public mapOptions: MapOptions;
  public showFilters: boolean = false;
  public loadFilteredProperties$: BehaviorSubject<any>;
  public showSignupAd$: Observable<boolean>;
  public hasAuth$: Observable<boolean> = this.userService.hasAuth$;

  constructor(private propertyService: PropertyService, private userService: UserService, private persist: PersistenceService,
    private route: ActivatedRoute, private router: Router, private propertySeoService: PropertySeoService, private renderer: Renderer,
    private facetsService: FacetsService) { }

  ngOnInit() {
    this.updateMapOptions(); // does this need to be in after view init?
    this.loadFilteredProperties$ = new BehaviorSubject(null);
    this.showSignupAd$ = this.userService.hasAuth$
      .filter(i => !i)
      .map(() => !this.persist.get('no_signup_ad'));

    Observable.combineLatest(this.loadFilteredProperties$, this.route.params)
      .do((i: [PropertyFacet, Params]) => this.setSearchParams(i[1]))
      .debounceTime(500)
      .flatMap(() => this.facetsService.loadFacets())
      .flatMap(() => this.facetsService.minPrice$)
      .do(i => this.facet.min_price = this.facet.min_price < i ? i : this.facet.min_price)
      .flatMap(() => this.facetsService.maxPrice$)
      .do(i => this.facet.max_price = this.facet.max_price > i ? i : this.facet.max_price)
      .flatMap(() => this.propertyService.searchProperties(this.getSearchParams()))
      .do(i => this.propertySeoService.addProperties(this.renderer, i))
      .subscribe(i => this.properties$.next(i));

    this.lastPage$ = this.propertyService.lastPage$;
  }

  public applyFacet(facet?: PropertyFacet) {
    this.facet = facet ? facet : this.facet;

    this.facetsService.loadFacets()
      .flatMap(() => Observable.combineLatest(this.facetsService.minPrice$, this.facetsService.maxPrice$))
      .filter(i => typeof i[0] === 'number' && typeof i[1] === 'number')
      .subscribe((i: [number, number]) => {
        if (
          this.facet.min_price === i[0]
          && this.facet.max_price === i[1]
          && this.facet.min_bedrooms === 1
          && this.facet.min_bathrooms === 1
          && this.facet.amenities.length === 0
          && this.facet.types.length === 0
          && this.facet.locations.length === 0
          && (typeof this.query !== 'string' || this.query.length === 0)
          && this.pageNumber === 1
        ) {
          this.loadFilteredProperties$.next(this.facet);
        } else {
          this.router.navigateByUrl(`/search;${this.makeSearchParams(this.getSearchParams())}`);
        }
      });
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

  private makeSearchParams(params: PropertySearchParams): string {
    let queryString = createUrlRangeParam('price', [params.facet.min_price, params.facet.max_price]);

    if (params.facet.min_bedrooms > 1) {
      queryString += createUrlParam('bed', params.facet.min_bedrooms);
    }

    if (params.facet.min_bathrooms > 1) {
      queryString += createUrlParam('bath', params.facet.min_bathrooms);
    }

    if (params.page > 1) {
      queryString += createUrlParam('page', params.page);
    }

    if (params.facet.amenities.filter(i => i.active).length) {
      queryString += createUrlListParam('amenities', params.facet.amenities.filter(i => i.active).map(i => i.name));
    }
    if (params.facet.types.length) {
      queryString += createUrlListParam('types', params.facet.types);
    }

    if (params.facet.locations.length) {
      queryString += createUrlListParam('locations', params.facet.locations);
    }

    return queryString;
  }

  private getSearchParams(): PropertySearchParams {
    return { query: this.query, facet: this.facet, page: this.pageNumber, perPage: this.pageNumber === 1 ? 3 : 4, offset: this.pageNumber === 1 ? 0 : 1 };
  }

  private setSearchParams(queryParams: Params): void {
    this.facet = new PropertyFacet();
    this.query = queryParams['query'] || '';
    this.pageNumber = Number(queryParams['page']) || 1;
    this.facet.min_bathrooms = queryParams['bath'] ? Number(queryParams['bath']) : this.facet.min_bathrooms;
    this.facet.min_bedrooms = queryParams['bed'] ? Number(queryParams['bed']) : this.facet.min_bedrooms;

    if (queryParams['price']) {
      [this.facet.min_price, this.facet.max_price] = parseUrlRange(queryParams['price']);
    }

    if (queryParams['amenities']) {
      this.facet.amenities = parseUrlList(queryParams['amenities']).map(name => new Amenity({ name }));
    }

    if (queryParams['types']) {
      this.facet.types = parseUrlList(queryParams['types']);
    }

    if (queryParams['locations']) {
      this.facet.locations = parseUrlList(queryParams['locations']);
    }
  }
}