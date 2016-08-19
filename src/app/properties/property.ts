export interface Amenity {
  name: String;
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
  public image_url: string;
  public latitude: number;
  public longitude: number;
  public locations: Location[];
  public lease_length: number; // months
  public licenser_id: string;
  public owner_id: number;
  public slug: string;
  public square_footage: number;
  public types: any[]; // what type?
  public updated_at: Date;
  public zipcode: string;
  public price: number;
}