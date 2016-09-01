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
    const cache = this.getFromViewCache();
    return cache ? Observable.of(cache) : this.http
      .post(`${BASE_API_URL}/properties/filtered_results`, { facets: facet, page: pageNumber, per_page: perPage })
      .map(i => i.json())
      .do(i => this.lastPage$.next(Math.ceil(i.total_count / perPage)))
      .map(i => i.results)
      .do(i => this.hydrateViewCache(i))
  }

  public getPropertyBySlug$(slug: string): Observable<Property> {
    return this.http.get(`${BASE_API_URL}/properties/${slug}`)
      .map(i => i.json());
  }

  public update(property: Property): Observable<Property> {
    return this.http.patch(`${BASE_API_URL}/properties/${property.id}`, property)
      .map(i => i.json());
  }

  private hydrateViewCache(properties: Property[]) {
    const elem = this.renderer.createElement(this.document.body, 'meta');
    this.renderer.setElementClass(elem, 'properties-cache', true);
    this.renderer.setElementAttribute(elem, 'properties:cache', JSON.stringify(properties));
  }

  private getFromViewCache(): Property[] {
    return this.unsafe.tryUnsafeCode(() => JSON.parse(getDOM().query('.properties-cache').getAttribute('properties:cache')), 'This seems alright?');
  }

  constructor(
    private unsafe: ServerUnsafeService,
    private http: HttpService,
    private renderer: Renderer,
    @Inject(DOCUMENT) private document: any
  ) {
  }
}