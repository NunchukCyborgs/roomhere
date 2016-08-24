import { Location, Amenity } from '../services/facets.service';
import { User } from '../users/index';

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
  public amenities: Amenity[];
  public bedrooms: number;
  public bathrooms: number;
  public contact_email: string;
  public created_at: Date;
  public description: string;
  public id: number;
  public images: {id: number, url: string};
  public latitude: number;
  public longitude: number;
  public locations: Location[];
  public lease_length: number; // months
  public licenser_id: string;
  public owner_id: number;
  public slug: string;
  public square_footage: number;
  public types: string[];
  public updated_at: Date;
  public zipcode: string;
  public price: number;
}

export enum PropertyActionStates {
  Editing,
  Edit,
  Claim,
  Nothing,
  Rent
}

export interface PropertyActionState {
  state: PropertyActionStates;
  text: string;
}

export class PropertyAction {
  private static getStateText(state: PropertyActionStates): string {
    switch (state) {
      case PropertyActionStates.Edit:
        return 'Edit Property';
      case PropertyActionStates.Claim:
        return 'claim Property';
      case PropertyActionStates.Nothing:
        return '';
      case PropertyActionStates.Rent:
        return 'Rent Now!';
    }
  }

  public static getState(property: Property, user: User): PropertyActionState {
    if (user.licenser_id && user.licenser_id === property.licenser_id && property.owner_id === null) {
      return { state: PropertyActionStates.Claim, text: this.getStateText(PropertyActionStates.Claim) };

    } else if (user.uid) { //(property.owner_id === user.id) {
      return { state: PropertyActionStates.Edit, text: this.getStateText(PropertyActionStates.Edit) };

    } else if (!user.licenser_id) {
      return { state: PropertyActionStates.Rent, text: this.getStateText(PropertyActionStates.Rent) };
      
    } else {
      return { state: PropertyActionStates.Nothing, text: this.getStateText(PropertyActionStates.Nothing) };
    }
  }
}