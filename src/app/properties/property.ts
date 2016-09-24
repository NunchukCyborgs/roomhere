import { Location, Amenity } from '../services/facets.service';
import { User } from '../users/user';

export interface Type {
  name: string;
  id: number;
  active: boolean;
  _destroy?: boolean;
};

export class PropertyFacet {
   public min_price: number;
   public max_price: number;
   public min_bedrooms: number;
   public min_bathrooms: number;
   public max_lease_length: number;
   public locations: Location[];
   public amenities: Amenity[];
   public types: string[];

   constructor() {
     this.min_price = 0;
     this.max_price = 25000;
     this.min_bedrooms = 0;
     this.min_bathrooms = .5;
     this.max_lease_length = null;
     this.locations = [];
     this.amenities = [];
     this.types = [];
   }

   get formattedFacet() {
     let formatted = {};
     for (let key of Object.keys(this)) {
          formatted[`facets[${key}]`] = this[key];
     }
     
     return formatted;
   }
}

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
  public images: Array<{id: number, url: string}> = [];
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
  public amenities_attributes: Array<{id: number, _destroy?: boolean}>;
  public types_attributes: Array<{id: number, _destroy?: boolean}>;
  public can_edit: boolean;
  public owner: Owner;
  public available_at: string; // Maybe make a date wrapper of some sort? Hmm?

  public isAvailable(): boolean {
    const time = this.available_at && new Date(this.available_at).getTime();
    const now = new Date().getTime();
    return time < now;
  }
}

export class Owner {
  owner_name: string;
  landlord_name: string;
  email: string;
  phone: string;

  public get contactName() {
    return this.landlord_name || this.owner_name;
  }
}
