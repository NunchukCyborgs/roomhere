import { Renderer, Inject, Injectable } from "@angular/core";
import { HttpService } from '../services/http.service';
import { DOCUMENT } from '@angular/platform-browser';
import { getDOM } from '@angular/platform-browser/src/dom/dom_adapter';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import { Property, PropertyFacet } from './index';
import { BASE_API_URL } from '../config';
import { ServerUnsafeService } from '../services/server-unsafe.service';

@Injectable()
export class PropertyService {
  public propertyBySlug$: BehaviorSubject<Property>;
  private _propertyBySlug: Property;

  public lastPage$: BehaviorSubject<number> = new BehaviorSubject(Number.MAX_SAFE_INTEGER)
  private viewCaches: string[] = [];

  public getFilteredProperties$(facet: PropertyFacet, pageNumber: number = 1, perPage: number = 10): Observable<Property[]> {
    const KEY: string = `properties_cache_p${pageNumber}_f${JSON.stringify(facet)}`
      .replace(/[^a-z_0-9]/ig, '');

    const cache = this.getFromViewCache(KEY);
    let sequence;
    if (cache) {
      sequence = Observable.of(cache);
    } else {
      sequence = this.http
        .post(`${BASE_API_URL}/properties/filtered_results`, { facets: facet, page: pageNumber, per_page: perPage })
        .map(i => i.json())
    }

    return sequence
      .do(i => this.lastPage$.next(Math.ceil(i.total_count / perPage)))
      .do(i => this.hydrateViewCache(i, KEY))
      .map(i => i.results);
  }

  public getPropertyBySlug$(slug: string): Observable<Property> {
    const KEY: string = `property_cache_${slug}`
      .replace(/[^a-z_0-9]/ig, '');;

    const cache = this.getFromViewCache(KEY);

    let sequence;
    if (cache) {
      sequence = Observable.of(cache);
    } else {
      sequence = this.http
        .get(`${BASE_API_URL}/properties/${slug}`)
        .map(i => i.json())
    }

    return sequence
      .do(i => this.hydrateViewCache(i, KEY))
      .do(i => this._propertyBySlug = i)
      .do(() => this.propertyBySlug$ = this.propertyBySlug$ || new BehaviorSubject(this._propertyBySlug)) // do something else
      .flatMap(i => this.updateLocal(i));
  }

  public update(property: Property): Observable<any> {
    property = this.updateAmenities(property);
    return this.http.patch(`${BASE_API_URL}/properties/${property.id}`, {property: property})
      .map(i => i.json())
      .flatMap(i => this.updateLocal(i));
  }

  public updateLocal(property: Property): Observable<Property> {
    this._propertyBySlug = property;
    this.propertyBySlug$.next(this._propertyBySlug);
    return this.propertyBySlug$;
  }

  private updateAmenities(property: Property): Property {
    property.amenities_attributes = property.amenities.map(i => { return {id: i.id, _destroy: !i.active}; });
    return property;
  }

  private hydrateViewCache(obj: any, key: string) {
    if (this.viewCaches.indexOf(key) === -1) {
      this.viewCaches.push(key);
      const elem = this.renderer.createElement(this.document.body, 'meta');
      this.renderer.setElementClass(elem, key, true);
      this.renderer.setElementAttribute(elem, 'value', JSON.stringify(obj));
    }
  }

  private getFromViewCache(key: string): any {
    return this.unsafe.tryUnsafeCode(() => {
      const element = getDOM().query(`.${key}`);
      return JSON.parse(element && element.getAttribute('value'));
    }, 'not implemented exception');
  }

  public deleteImage(property: Property, imageId: number): Observable<any> {
    return this.http.delete(`${BASE_API_URL}/properties/${property.slug}/images/${imageId}`)
      .map(i => i.json())
      .flatMap(i => this.updateLocal(i));
  }

  constructor(
    private unsafe: ServerUnsafeService,
    private http: HttpService,
    private renderer: Renderer,
    @Inject(DOCUMENT) private document: any
  ) {
    // Cache the base case. This request gets auto cancelled by angular
    // during application init, but we need this to be view cached
    // in our custom shitty view caching system
    this.getFilteredProperties$(new PropertyFacet()).subscribe();
  }
}
