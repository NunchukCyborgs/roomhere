import { Injectable } from "@angular/core";
import { HttpService } from '../services/http.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { Property, PropertyFacet } from './index';

import { BASE_URL } from '../config';

@Injectable()
export class PropertyService {
  public collection$: BehaviorSubject<Property[]>;
  public _collection: Property[] = [];

  constructor(private http: HttpService) {
    this.collection$ = new BehaviorSubject(this._collection);
    this.collection$.subscribe();

    this.http.get(`${BASE_URL}/properties/filtered_results`)
      .subscribe(res => {
          this._collection = this._collection || [];
          let json = res.json();

          for (let property in json) {
              this._collection.push(json[property]);
              this.collection$.next(this.collection);
          }
      });
  }
    
  get collection(): Property[] {
    return Object.assign([], this._collection);
  }

  public getFilteredProperties$(facet: PropertyFacet): Observable<Property[]> {
    return this.http.post(`${BASE_URL}/properties/filtered_results`, {facets: facet})
      .map(i => i.json());
  }

  public getPropertyBySlug$(slug: string): Observable<Property> {
    let property$ = new Observable()
    const index = this._collection.map(i => i.slug).indexOf(slug);
    if (index !== -1) {
      return Observable.of(this._collection[index]);
    } else {
      return this.http.get(`${BASE_URL}/properties/${slug}`).map(i => {
        const property = i.json();
        this._collection.push(property);
        return property;
      });
    }
  }

  public update(property: Property): Observable<Property> {
    return this.http.patch(`${BASE_URL}/properties/${property.id}`, property)
      .map(i => i.json());
  }
}