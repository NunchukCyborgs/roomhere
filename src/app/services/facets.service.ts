import { Injectable } from "@angular/core";
import { HttpService } from '../services/http.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { BASE_API_URL } from '../config';

export interface Amenity {
  // This should probably be defined somewhere else..
  id: number;
  name: string;
  icon: string;
  active: boolean;
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

@Injectable()
export class FacetsService {
  public amenities$: BehaviorSubject<Amenity[]>;
  public _amenities: Amenity[] = [];
  public locations$: BehaviorSubject<Location[]>;
  public _locations: Location[] = [];
  public minPrice$: BehaviorSubject<number> = new BehaviorSubject(0);
  public maxPrice$: BehaviorSubject<number> = new BehaviorSubject(5000);
  public types$: BehaviorSubject<string[]> = new BehaviorSubject([]);

  constructor(private http: HttpService) {
    this.amenities$ = new BehaviorSubject(this._amenities);
    this.amenities$.subscribe();
    this.locations$ = new BehaviorSubject(this._locations);
    this.locations$.subscribe();

    this.http.get(`${BASE_API_URL}/properties/facets`)
      .subscribe(res => {
        this._amenities = this._amenities || [];
        this._locations = this._locations || [];
        let json = res.json();
        for (let amenity of json.amenities) {
          this._amenities.push(amenity);
        }
        for (let location of json.locations) {
          this._locations.push(location);
        }

        this.amenities$.next(this._amenities);
        this.locations$.next(this._locations);
        this.minPrice$.next(json.min_price);
        this.maxPrice$.next(json.max_price);
        this.types$.next(json.types);
      });
  }

  get amenities(): Amenity[] {
    return Object.assign([], this._amenities);
  }

  get locations(): Amenity[] {
    return Object.assign([], this._locations);
  }
}
