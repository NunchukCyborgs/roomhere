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
  public myProperties$: BehaviorSubject<Property[]>;
  private _myProperties: Property[];

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
    const seq = this.http
      .get(`${BASE_API_URL}/properties/${slug}`)
      .map(i => i.json())
      .flatMap(i => this.updateCollection(i, this._propertyBySlug, this.propertyBySlug$));

      seq.subscribe();
      return seq;
  }

  public getMyProperties$(): Observable<any> {
    const seq = this.http
      .get(`${BASE_API_URL}/me`)
      .map(i => i.json().properties)
      .flatMap(i => this.updateCollection(i, this._myProperties, this.myProperties$));

      seq.subscribe();
      return seq;
  }

  public update(property: Property): Observable<any> {
    property = this.updateAmenities(property);
    property = this.updateTypes(property);
    return this.http.patch(`${BASE_API_URL}/properties/${property.slug}`, {property: property})
      .map(i => i.json())
      .flatMap(i => this.updatePropertyBySlugLocal(i));
  }

  public updatePropertyBySlugLocal(property: Property): Observable<Property> {
    return this.updateCollection(property, this._propertyBySlug, this.propertyBySlug$);
  }

  private updateCollection<T>(obj: T, collection: T, collection$: BehaviorSubject<T>): Observable<T> {
    collection = obj;
    collection$ = collection$ || new BehaviorSubject(collection);
    collection$.next(collection);
    return collection$;
  }

  private updateAmenities(property: Property): Property {
    property.amenities_attributes = property.amenities.map(i => { return { id: i.id, _destroy: !i.active }; });
    return property;
  }

  private updateTypes(property: Property): Property {
    property.types_attributes = property.types.map(i => { return {id: i.id, _destroy: !i.active}; });
    return property;
  }

  public deleteImage(property: Property, imageId: number): Observable<any> {
    return this.http.delete(`${BASE_API_URL}/properties/${property.slug}/images/${imageId}`)
      .map(i => i.json())
      .flatMap(i => this.updatePropertyBySlugLocal(i));
  }

  constructor(private http: HttpService) { }
}
