import { generateGUID, generateAnonymousName } from '../services/util';
import { User } from './user';

export class Property {
  public address1: string;
  public address2: string;
  public amenities: Amenity[] = [];
  public bedrooms: number;
  public bathrooms: number;
  public contact_email: string;
  public created_at: Date;
  public description: string;
  public id: number;
  public images: Image[] = [];
  public latitude: number;
  public longitude: number;
  public locations: Location[] = [];
  public lease_length: number; // months
  public owner_id: number;
  public slug: string;
  public square_footage: number;
  public types: Type[] = [];
  public updated_at: string;
  public zipcode: string;
  public price: number;
  public amenities_attributes: Array<{ id: number, _destroy?: boolean }>;
  public types_attributes: Array<{ id: number, _destroy?: boolean }>;
  public can_edit: boolean;
  public owner: Owner;
  public available_at: string; // Maybe make a date wrapper of some sort? Hmm?
  public is_owner?: boolean;
  public is_claimed?: boolean;
  public reviews?: Review[];

  constructor(property?: Property) {
    if (property) {
      for (let propertyName in property) {
        if (property.hasOwnProperty(propertyName)) {
          this[propertyName] = property[propertyName];
        }
      }

      if (property.amenities) {
        this.amenities = property.amenities.map(i => new Amenity(i));
      }
      if (property.reviews) {
        this.reviews = property.reviews.map(i => new Review(i));
      }
    }
  }

  // **** Property object must be newed up for getters to work. Should try again now ****
  // This is being generally shitty. For now, just going to treat available_at as a bool flag
  // public isAvailable(): boolean {
  //   const time = this.available_at && new Date(this.available_at).getTime();
  //   const now = new Date().getTime();
  //   return time < now;
  // }

  public get propertyUrl(): string {
    return `/${DEFAULT_TENANT}/${this.slug}`
  }
}

export class Owner {
  owner_name: string;
  landlord_name: string;
  email: string;
  phone: string;
}

export class Amenity {
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
      'Washer Dryer': 'icon-washer-dryer-2',
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

export interface Type {
  name: string;
  id: number;
  active: boolean;
  _destroy?: boolean;
};

export interface Image {
  id?: number;
  url: string;
  height: string;
  width: string;
}

export class Review {
  public id?: number;
  public title: string;
  public landlord_comments: string;
  public body: string;
  public landlord_rating: number;
  public property_rating: number;
  public is_owned?: boolean;
  public duration: number; // Whole number of months the tenant has stayed there
  public is_current_tenant?: boolean = true; // Do they currently live there
  public is_anonymous: boolean = false;
  public updated_at?: string;
  public created_at?: string;
  public approved_at?: string;
  public name?: string;
  private _name?: string;

  constructor(review: IReview = {}) {
    if (review) {
      for (let propertyName in review) {
        if (review.hasOwnProperty(propertyName)) {
          this[propertyName] = review[propertyName];
        }
      }
    }

    this._name = this.name || generateAnonymousName();
  }

  get displayName(): string {
    return this.name || this._name;
  }

  get prettyDuration(): string {
    const rounded = Math.round(Number(this.duration));
    return rounded < 12 ? `${rounded} months` : `${Math.round(rounded / 12.0)} years`;
  }
}

interface IReview {
  id?: number;
  title?: string;
  landlord_comments?: string;
  body?: string;
  landlord_rating?: number;
  property_rating?: number;
  is_owned?: boolean;
  duration?: number;
  is_current_tenant?: boolean;
  is_anonymous?: boolean;
  updated_at?: string;
  created_at?: string;
  approved_at?: string;
  name?: string;
  displayName?: string;
}
