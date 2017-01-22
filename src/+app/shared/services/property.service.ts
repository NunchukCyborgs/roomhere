import { Renderer, Inject, Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { HttpService } from './http.service';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
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

  public searchProperties(options: { query: string, perPage?: number, page?: number, offset?: number, facet?: PropertyFacet }): Observable<Property[]> {
    let defaultedOptions = Object.assign({}, { query: '', perPage: 15, page: 1, offset: 0 }, options);
    defaultedOptions.facet = Object.assign({}, new PropertyFacet(), options.facet)
    defaultedOptions.facet.min_bedrooms = defaultedOptions.facet.min_bedrooms > 1 ? defaultedOptions.facet.min_bedrooms : 0;
    defaultedOptions.facet.min_bathrooms = defaultedOptions.facet.min_bathrooms > 1 ? defaultedOptions.facet.min_bathrooms : 0;
    const queryOptions = `query=${defaultedOptions.query}&page=${defaultedOptions.page}&per_page=${defaultedOptions.perPage}&offset=${defaultedOptions.offset}${this.formatObj(defaultedOptions.facet)}`;

    return this.http
      .get(`${BASE_API_URL}/properties/filtered_results?${queryOptions}`)
      .filter(i => i.results && Array.isArray(i.results)) // Dirty error handling
      .do(i => this.setLastPageNumber(i.total_count, i.offset, i.perPage))
      .map(properties => properties.results.map(i => new Property(i)));
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

  public requestMissingProperty(email: string, address: string): Observable<Response> {
    return this.http.post(`${BASE_API_URL}/properties/request`, { contact_email: email, address: address }, { rawResponse: true });
  }

  private setLastPageNumber(totalCount: number, offset: number, perPage: number) {
    this.lastPage$.next(Math.ceil((totalCount - 1) / perPage));
  }

  private formatObj(facets: Object): string {
    let formatted = '';

    for (let propertyName in facets) {
      if (facets.hasOwnProperty(propertyName)) {
        formatted += typeof facets[propertyName] === 'object' ? this.formatObj(facets[propertyName]) : `&facets[${propertyName}]=${facets[propertyName]}`;
      }
    }

    return formatted;
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
