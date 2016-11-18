import { Injectable } from '@angular/core';
import { HttpService } from '../services/http.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { generateGUID } from './util';
import { Amenity, Location } from '../dtos/property';

@Injectable()
export class FacetsService {
  public amenities$: BehaviorSubject<Amenity[]>;
  public _amenities: Amenity[] = [];
  public locations$: BehaviorSubject<Location[]>;
  public _locations: Location[] = [];
  public minPrice$: BehaviorSubject<number> = new BehaviorSubject(-1);
  public maxPrice$: BehaviorSubject<number> = new BehaviorSubject(-1);
  public types$: BehaviorSubject<string[]> = new BehaviorSubject([]);

  constructor(private http: HttpService) {
    this.amenities$ = new BehaviorSubject(this._amenities);
    this.amenities$.subscribe();
    this.locations$ = new BehaviorSubject(this._locations);
    this.locations$.subscribe();

    this.http.get(`${BASE_API_URL}/properties/facets`)
      .subscribe(i => {
        this._amenities = this._amenities || [];
        this._locations = this._locations || [];
        for (let amenity of i.amenities) {
          this._amenities.push(new Amenity(amenity));
        }
        for (let location of i.locations) {
          this._locations.push(location);
        }

        this.amenities$.next(this._amenities);
        this.locations$.next(this._locations);
        this.minPrice$.next(i.min_price);
        this.maxPrice$.next(i.max_price);
        this.types$.next(i.types);
      });
  }

  get amenities(): Amenity[] {
    return Object.assign([], this._amenities);
  }

  get locations(): Amenity[] {
    return Object.assign([], this._locations);
  }
}
