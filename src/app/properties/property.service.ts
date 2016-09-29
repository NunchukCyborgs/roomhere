import { Renderer, Inject, Injectable } from "@angular/core";
import { HttpService } from '../services/http.service';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import { Property, PropertyFacet } from './property';
import { BASE_API_URL } from '../config';

@Injectable()
export class PropertyService {
  public propertyBySlug$: BehaviorSubject<Property>;
  private _propertyBySlug: Property = new Property();
  public myProperties$: BehaviorSubject<Property[]>;
  private _myProperties: Property[] = [];
  public superProperties$: BehaviorSubject<Property[]>;
  private _superProperties: Property[] = [];

  public lastPage$: BehaviorSubject<number> = new BehaviorSubject(Number.MAX_SAFE_INTEGER)
  private viewCaches: string[] = [];

  public getFilteredProperties$(facet: PropertyFacet, pageNumber: number = 1, perPage: number = 6): Observable<Property[]> {
    return Observable.of([])
      .filter(() => facet.min_price >= 0 && facet.max_price >= 0)
      .flatMap(() => this.http.post(`${BASE_API_URL}/properties/filtered_results`, { facets: facet, page: pageNumber, per_page: perPage }))
      .map(i => i.json())
      .do(i => this.lastPage$.next(Math.ceil(i.total_count / perPage)))
      .map(i => i.results);
  }

  public getPropertyBySlug$(slug: string): Observable<any> {
    const seq = this.http
      .get(`${BASE_API_URL}/properties/${slug}`)
      .map(i => i.json())
      .do(i => this.propertyBySlug$.next(this._propertyBySlug = i.id ? i : null));

    seq.subscribe();
    return seq
      .flatMap(i => this.propertyBySlug$);
  }

  public getMyProperties$(): Observable<any> {
    const seq = this.http
      .get(`${BASE_API_URL}/me`)
      .map(i => i.json().properties)
      .do(i => this.myProperties$.next(this._myProperties = i));

    seq.subscribe();
    return seq
      .flatMap(i => this.myProperties$);
  }

  public getSuperProperties$(pageNumber = 1, perPage = 100, query = ''): Observable<any> {
    const seq = this.http
      .get(`${BASE_API_URL}/properties?page=${pageNumber}&per_page=${perPage}&q=${query}`)
      .map(i => i.json())
      .do(i => this.superProperties$.next(this._superProperties = i));

    seq.subscribe();
    return seq
      .flatMap(i => this.superProperties$);
  }

  public update(property: Property): Observable<any> {
    property = this.updateAmenities(property);
    property = this.updateTypes(property);
    return this.http.patch(`${BASE_API_URL}/properties/${property.slug}`, { property: property })
      .map(i => i.json())
      .flatMap(i => this.updatePropertyBySlugLocal(i));
  }

  public updatePropertyBySlugLocal(property: Property): Observable<Property> {
    const updatedProperties = this._myProperties.map(i => i.id === property.id ? property : i);
    this.myProperties$.next(this._myProperties = updatedProperties);
    this.propertyBySlug$.next(this._propertyBySlug = property);
    return this.propertyBySlug$;
  }

  private updateAmenities(property: Property): Property {
    property.amenities_attributes = property.amenities.map(i => { return { id: i.id, _destroy: !i.active }; });
    return property;
  }

  private updateTypes(property: Property): Property {
    property.types_attributes = property.types.map(i => { return { id: i.id, _destroy: !i.active }; });
    return property;
  }

  public deleteImage(property: Property, imageId: number): Observable<any> {
    return this.http.delete(`${BASE_API_URL}/properties/${property.slug}/images/${imageId}`)
      .map(i => i.json())
      .flatMap(i => this.updatePropertyBySlugLocal(i));
  }

  constructor(private http: HttpService) {
    this.myProperties$ = new BehaviorSubject(this._myProperties);
    this.superProperties$ = new BehaviorSubject(this._superProperties);
    this.propertyBySlug$ = new BehaviorSubject(this._propertyBySlug);
  }
}
