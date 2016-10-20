import { Injectable } from '@angular/core';
import { HttpService } from '../services/http.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { generateGUID } from './util.service';

export class Amenity {
  // This should probably be defined somewhere else..
  id: any;
  name: string;
  active: boolean;

  constructor({id, name, active}: {id?: number, name?: string, active?: boolean}) {
    this.id = id || generateGUID();
    this.name = name;
    this.active = active;
  }

  public get icon() {
    const iconSet = {
      'Pet Friendly': 'fa fa-paw',
      'Wheelchair Accessible': 'fa fa-wheelchair-alt',
      'Washer/Dryer': 'icon-washer-dryer-2',
      'Electricity Included': 'icon-electricity',
      'Gas Included': 'icon-gas',
      'Water Included': 'icon-tint',
      'Trash Included': 'fa fa-trash',
      'Central Air': 'icon-central-air-alt',
      'Indoor Fireplace': 'fa fa-fire',
      'Smoking Allowed': 'icon-smoking-allowed',
      'Garage': 'icon-garage-512',
      'Lawn Care': 'icon-lawn-mower',
      'Internet Included': 'fa fa-wifi',
      'Cable Included': 'fa fa-television',
    };

    return iconSet[this.name] || 'fa fa-certificate';
  }

  public get shortName() {
    return this.name.replace(' Included', ' Incl.').replace(' Allowed', '');
  }
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
  public minPrice$: BehaviorSubject<number> = new BehaviorSubject(-1);
  public maxPrice$: BehaviorSubject<number> = new BehaviorSubject(-1);
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
          this._amenities.push(new Amenity(amenity));
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
