import { Injectable } from "@angular/core";
import { HttpService } from '../services/http.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { Property, PropertyFacet } from './index';
import { BASE_URL } from '../config';

@Injectable()
export class PropertyService {

  public lastPage$: BehaviorSubject<number> = new BehaviorSubject(Number.MAX_SAFE_INTEGER)

  constructor(private http: HttpService) { }

  public getFilteredProperties$(facet: PropertyFacet, pageNumber: number = 1, perPage: number = 10): Observable<Property[]> {
    return this.http.post(`${BASE_URL}/properties/filtered_results`, { facets: facet, page: pageNumber, per_page: perPage })
      .map(i => i.json())
      .do(i => this.lastPage$.next(Math.ceil(i.total_count / perPage)))
      .map(i => i.results);
  }

  public getPropertyBySlug$(slug: string): Observable<Property> {
    return this.http.get(`${BASE_URL}/properties/${slug}`)
      .map(i => i.json());
  }

  public update(property: Property): Observable<Property> {
    return this.http.patch(`${BASE_URL}/properties/${property.id}`, property)
      .map(i => i.json());
  }
}