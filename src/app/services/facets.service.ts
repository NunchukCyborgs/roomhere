import { Injectable } from "@angular/core";
import { Http } from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

export interface Amenity {
  name: string;
}

export interface Location {
  id: number;
  full_name: string;
  facet_name: string;
  data_name: string;
  latitude: number;
  longitude: number;
  created_at: Date;
  updated_at: Date;
}
const BASE_URL = 'https://semorental.com/api/';

@Injectable()
export class FacetsService {
  public amenities$: BehaviorSubject<Amenity[]>;
  public _amenities: Amenity[] = [];
  public locations$: BehaviorSubject<Location[]>;
  public _locations: Location[] = [];

  constructor(private http: Http) {
    this.amenities$ = new BehaviorSubject(this._amenities);
    this.amenities$.subscribe();
    this.locations$ = new BehaviorSubject(this._locations);
    this.locations$.subscribe();

    this.http.get(`${BASE_URL}properties/facets`)
      .subscribe(res => {
        this._amenities = this._amenities || [];
        this._locations = this._locations || [];
        let json = res.json();

        for (let amenity of json.amenities) {
            this._amenities.push(amenity);
            this.amenities$.next(this._amenities);
        }
        for (let location of json.locations) {
            this._locations.push(location);
            this.locations$.next(this._locations);
        }
      });
  }
    
  get amenities(): Amenity[] {
    return Object.assign([], this._amenities);
  }
    
  get locations(): Amenity[] {
    return Object.assign([], this._locations);
  }
}