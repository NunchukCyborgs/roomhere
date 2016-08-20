import { Injectable } from "@angular/core";
import { Http } from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
// import { Observable } from 'rxjs/Observable';

import { Property, PropertyFacet } from './property';
export { Property, PropertyFacet } from './property';

const BASE_URL = 'https://semorental.com/api/';

@Injectable()
export class PropertyService {
  public collection$: BehaviorSubject<Property[]>;
  public _collection: Property[] = [];

  constructor(private http: Http) {
    this.collection$ = new BehaviorSubject(this._collection);
    this.collection$.subscribe();

    this.http.get(`${BASE_URL}properties/filtered_results`)
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

  public getFilteredProperties$(facet: PropertyFacet) {
    return this.http.post(`${BASE_URL}properties/filtered_results`, {facets: facet})
      .map(i => {
        return i.json();
      });
      // .do(properties => {
      //   for(let property of properties) {
      //     if (this._collection.map(i => i.id).indexOf(property.id) === -1) {
      //       this._collection.push(property)
      //     }
      //   }

      //   this.collection$.next(this._collection);
      // });
  }
}