import { Renderer, Inject, Injectable } from "@angular/core";
import { HttpService } from './http.service';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import { Property } from '../../shared/dtos/property';
import { PropertyFacet } from '../../shared/dtos/facets';

import { getHoneybadger } from './honeybadger';

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

  public getFilteredProperties$(facet: PropertyFacet, query: string = '', pageNumber: number = 1, perPage: number = 6): Observable<Property[]> {
    return Observable.of([])
      .flatMap(() => this.http.post(`${BASE_API_URL}/properties/filtered_results`, { facets: facet, page: pageNumber, per_page: perPage, query: query }))
      .filter(i => i.results && i.total_count) // Dirty error handling
      .do(i => this.lastPage$.next(Math.ceil(i.total_count / perPage)))
      .map(i => i.results);
  }

  public getPropertyBySlug$(slug: string): Observable<any> {
    return this.http
      .get(`${BASE_API_URL}/properties/${slug}`)
      .map(i => new Property(i))
      .do(i => this.propertyBySlug$.next(this._propertyBySlug = i.id ? i : null));
  }

  public getMyProperties$(): Observable<any> {
    const seq = this.http
      .get(`${BASE_API_URL}/me`)
      .map(i => i.properties)
      .filter(i => i)
      .map(properties => properties.map(i => new Property(i)))
      .do(i => this.myProperties$.next(this._myProperties = i));

    seq.subscribe();
    return seq
      .flatMap(i => this.myProperties$);
  }

  public getSuperProperties$(pageNumber = 1, perPage = 100, query = ''): Observable<any> {
    const seq = this.http
      .get(`${BASE_API_URL}/properties?page=${pageNumber}&per_page=${perPage}&q=${query}`)
      .do(i => console.log('heyo, ', i))
      .map(i => i && i.length ? i : [])
      .map(properties => properties.map(i => new Property(i)))
      .do(i => this.superProperties$.next(this._superProperties = i));

    seq.subscribe();
    return seq
      .flatMap(i => this.superProperties$);
  }

  public update(property: Property): Observable<any> {
    property = this.updateAmenities(property);
    property = this.updateTypes(property);
    return this.http.patch(`${BASE_API_URL}/properties/${property.slug}`, { property: property })
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
      .flatMap(i => this.updatePropertyBySlugLocal(i));
  }

  constructor(private http: HttpService) {
    this.myProperties$ = new BehaviorSubject(this._myProperties);
    this.superProperties$ = new BehaviorSubject(this._superProperties);
    this.propertyBySlug$ = new BehaviorSubject(this._propertyBySlug);

    Observable.combineLatest(this.myProperties$, this.superProperties$, this.propertyBySlug$)
      .subscribe(i => getHoneybadger(true)
        .setContext({
            myProperties: i[0],
            superProperties: i[1],
            propertyBySlug: i[2],
        })
      );
  }
}
