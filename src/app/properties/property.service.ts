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
  public lastPage$: BehaviorSubject<number> = new BehaviorSubject(Number.MAX_SAFE_INTEGER)

  public getFilteredProperties$(facet: PropertyFacet, pageNumber: number = 1, perPage: number = 10): Observable<Property[]> {
    const KEY: string = 'properties_cache';
    const cache = this.getFromViewCache(KEY);

    return cache ? Observable.of(cache) : this.http
      .post(`${BASE_API_URL}/properties/filtered_results`, { facets: facet, page: pageNumber, per_page: perPage })
      .map(i => i.json())
      .do(i => this.lastPage$.next(Math.ceil(i.total_count / perPage)))
      .map(i => i.results)
      .do(i => this.hydrateViewCache(i, KEY))
  }

  public getPropertyBySlug$(slug: string): Observable<Property> {

    const KEY: string = 'property_cache';
    const cache = this.getFromViewCache(KEY);

    return cache ? Observable.of(cache) : this.http
      .get(`${BASE_API_URL}/properties/${slug}`)
      .map(i => i.json())
      .do(i => this.hydrateViewCache(i, KEY))
  }

  public update(property: Property): Observable<Property> {
    return this.http.patch(`${BASE_API_URL}/properties/${property.id}`, property)
      .map(i => i.json());
  }

  private hydrateViewCache(obj: any, key: string) {
    const elem = this.renderer.createElement(this.document.body, 'meta');
    this.renderer.setElementClass(elem, key, true);
    this.renderer.setElementAttribute(elem, key, JSON.stringify(obj));
  }

  private getFromViewCache(key: string): any {
    return this.unsafe.tryUnsafeCode(() => JSON.parse(getDOM().query(`.${key}`).getAttribute(key)), 'not implemented exception');
  }

  constructor(
    private unsafe: ServerUnsafeService,
    private http: HttpService,
    private renderer: Renderer,
    @Inject(DOCUMENT) private document: any
  ) {
  }
}