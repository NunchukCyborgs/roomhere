import { Renderer, Inject, Injectable } from "@angular/core";
import { HttpService } from '../services/http.service';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import { Property, PropertyFacet } from './index';
import { BASE_API_URL } from '../config';

@Injectable()
export class PropertyService {
  public propertyBySlug$: BehaviorSubject<Property>;
  private _propertyBySlug: Property;

  public lastPage$: BehaviorSubject<number> = new BehaviorSubject(Number.MAX_SAFE_INTEGER)
  private viewCaches: string[] = [];

  public getFilteredProperties$(facet: PropertyFacet, pageNumber: number = 1, perPage: number = 10): Observable<Property[]> {
    return this.http
      .post(`${BASE_API_URL}/properties/filtered_results`, { facets: facet, page: pageNumber, per_page: perPage })
      .map(i => i.json())
      .do(i => this.lastPage$.next(Math.ceil(i.total_count / perPage)))
      .map(i => i.results);
  }

  public getPropertyBySlug$(slug: string): Observable<any> {
    return this.http
      .get(`${BASE_API_URL}/properties/${slug}`)
      .map(i => i.json())
      .do(i => this._propertyBySlug = i)
      .do(() => this.propertyBySlug$ = this.propertyBySlug$ || new BehaviorSubject(this._propertyBySlug)) // do something else
      .flatMap(i => this.updateLocal(i));
  }

  public update(property: Property): Observable<any> {
    property = this.updateAmenities(property);
    return this.http.patch(`${BASE_API_URL}/properties/${property.id}`, { property: property })
      .map(i => i.json())
      .flatMap(i => this.updateLocal(i));
  }

  public updateLocal(property: Property): Observable<Property> {
    this._propertyBySlug = property;
    this.propertyBySlug$.next(this._propertyBySlug);
    return this.propertyBySlug$;
  }

  private updateAmenities(property: Property): Property {
    property.amenities_attributes = property.amenities.map(i => { return { id: i.id, _destroy: !i.active }; });
    return property;
  }

  public deleteImage(property: Property, imageId: number): Observable<any> {
    return this.http.delete(`${BASE_API_URL}/properties/${property.slug}/images/${imageId}`)
      .map(i => i.json())
      .flatMap(i => this.updateLocal(i));
  }

  constructor(private http: HttpService) { }
}
