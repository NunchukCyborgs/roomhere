import {Injectable} from "@angular/core";
import { Http } from '@angular/http';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

import {Property} from './property';
export {Property} from './property';

const BASE_URL = 'http://localhost:3000/api/';

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
}